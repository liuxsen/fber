const path = require('node:path')
const fs = require('node:fs')
const { rollup } = require('rollup')
const chalk = require('chalk')
const { rimrafSync } = require('rimraf')
const getFberConfig = require('../../utils/getFberConfig')
const { getRollupPlugins } = require('../getRollupPlugins')
const { root } = require('../../utils/constants')
const { capitalizeFirstLetter } = require('../../utils/getComponentName')

module.exports.buildComponents = async () => {
  getEntryList()
}

function getEntryList() {
  const config = getFberConfig()
  const absPath = path.join(root, config.components.entry)
  const stat = fs.statSync(absPath)
  if (!stat.isDirectory) {
    // eslint-disable-next-line
    console.log('组件入口不是文件夹')
    return
  }
  const dirs = fs.readdirSync(absPath)
  const list = dirs.map((item) => {
    const filePath = path.join(absPath, item)
    const fileState = fs.statSync(filePath)
    const isDir = fileState.isDirectory()
    const componentPath = path.join(filePath, 'index.ts')
    const isComponent = fs.existsSync(componentPath)

    const fullPath = isDir && isComponent ? componentPath : filePath
    return {
      name: item,
      isDir,
      isComponent,
      fullPath,
    }
  })
  const plugins = getRollupPlugins(root)
  // // 清空dist目录
  rimrafSync(path.join(root, 'dist', 'components'))
  list.forEach((item) => {
    if (!item.isComponent) {
      return
    }
    build([
      item.name,
      item.fullPath,
    ], plugins, config)
  })
}

async function build([pluginName, componentPath], plugins, config) {
  const bundle = await rollup({
    input: componentPath,
    plugins,
    external: config.components.external,
  })
  await generateOutputs(bundle, pluginName, config)
}

function _genComponnetName(prefix, name) {
  const firstChar = capitalizeFirstLetter(name)
  if (prefix) {
    return prefix.toUpperCase() + firstChar
  }
  else {
    return firstChar
  }
}

async function generateOutputs(bundle, pluginName, config) {
  const outputOptionsList = [
    {
      format: 'cjs',
      file: path.join(root, 'dist', 'components', pluginName, 'index.cjs.js'),
    },
    {
      format: 'iife',
      name: pluginName,
      file: path.join(root, 'dist', 'components', pluginName, 'index.iife.js'),
    },
    {
      format: 'umd',
      name: pluginName,
      file: path.join(root, 'dist', 'components', pluginName, 'index.umd.js'),
    },
    {
      format: 'es',
      file: path.join(root, 'dist', 'components', pluginName, 'index.es.js'),
    },
  ].map((item) => {
    return {
      ...item,
      globals: config.components.globals || {},
    }
  })
  try {
    for (const outputOptions of outputOptionsList) {
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // replace bundle.generate with bundle.write to directly write to disk
      const { output } = await bundle.write(outputOptions)
      for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Uint8Array    // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        // console.log('Asset', chunkOrAsset)
        }
        else {
        // For chunks, this contains
        // {
        //   code: string,                  // the generated JS code
        //   dynamicImports: string[],      // external modules imported dynamically by the chunk
        //   exports: string[],             // exported variable names
        //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
        //   fileName: string,              // the chunk file name
        //   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
        //   imports: string[],             // external modules imported statically by the chunk
        //   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
        //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
        //   isEntry: boolean,              // is this chunk a static entry point
        //   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
        //   map: string | null,            // sourcemaps if present
        //   modules: {                     // information about the modules in this chunk
        //     [id: string]: {
        //       renderedExports: string[]; // exported variable names that were included
        //       removedExports: string[];  // exported variable names that were removed
        //       renderedLength: number;    // the length of the remaining code in this module
        //       originalLength: number;    // the original length of the code in this module
        //       code: string | null;       // remaining code in this module
        //     };
        //   },
        //   name: string                   // the name of this chunk as used in naming patterns
        //   preliminaryFileName: string    // the preliminary file name of this chunk with hash placeholders
        //   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
        //   type: 'chunk',                 // signifies that this is a chunk
        // }
        // console.log('Chunk', chunkOrAsset.modules)
        }
      }
    }
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  // 更新package.json
  // updatePkgJSON(cliOptions.pluginName)
  // genVuets()
  // eslint-disable-next-line
  console.log(chalk.green('构建完成'))
}
