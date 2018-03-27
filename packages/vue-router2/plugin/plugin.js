import { Babel } from 'meteor/babel-compiler'

Plugin.registerCompiler({
  extensions: ['routes.js'],
}, () => new VueRouterCompiler())

class VueRouterCompiler extends CachingCompiler {
  constructor () {
    super({
      compilerName: 'vue-router2',
      defaultCacheSize: 1024 * 1024 * 10,
    })
  }

  getCacheKey (inputFile) {
    return [
      inputFile.getSourceHash(),
      inputFile.getPathInPackage(),
    ]
  }

  compileResultSize (compileResult) {
    return compileResult.code.length + compileResult.map.length
  }

  compileOneFile (inputFile) {
    let source = inputFile.getContentsAsString()
    let packageName = inputFile.getPackageName()
    let inputFilePath = inputFile.getPathInPackage()
    let sourcePath = packageName ? 'packages/' + packageName + '/' + inputFilePath : inputFilePath

    let code = source
    code = code.replace(jsExportDefaultReg, 'return')
    code = code.replace(componentReg, 'component: require($1).default')
    code = 'let r = (()=>{' + code + `})();
    import { RouterFactory } from 'meteor/akryum:vue-router2';
    RouterFactory.configure(factory => { factory.addRoutes(r); })`
    let map = ''

    let babelOptions = Babel.getDefaultOptions()
    babelOptions.sourceMap = true
    babelOptions.filename = babelOptions.sourceFileName = sourcePath
    babelOptions.sourceMapTarget = babelOptions.filename + '.map'

    // Babel compilation
    let output = Babel.compile(code, babelOptions)
    code = output.code
    map = output.map

    return {
      code,
      map,
    }
  }

  addCompileResult (inputFile, compileResult) {
    let packageName = inputFile.getPackageName()
    let inputFilePath = inputFile.getPathInPackage()
    let sourcePath = packageName ? 'packages/' + packageName + '/' + inputFilePath : inputFilePath

    inputFile.addJavaScript({
      path: inputFilePath,
      sourcePath,
      data: compileResult.code,
      sourceMap: compileResult.map,
    })
  }
}

const jsExportDefaultReg = /export\s+default/g
const componentReg = /component:\s*((['"]).*?\2)/g
