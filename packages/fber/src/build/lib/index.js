const path = require('node:path')
const { rollup } = require('rollup')
const chalk = require('chalk')
const { root } = require('../../utils/constants')
const getFberConfig = require('../../utils/getFberConfig')
const { getRollupPlugins } = require('../getRollupPlugins')

module.exports.buildLib = async () => {
  const config = getFberConfig()
  const configEntry = config.lib.entry
  const entry = path.join(root, configEntry)
  const plugins = getRollupPlugins(root)

  const bundle = await rollup({
    input: entry,
    plugins,
    external: config.lib.external,
  })
  const pluginName = config.lib.pluginName
  if (!pluginName) {
    // eslint-disable-next-line
    console.log('请配置lib模式的pluginName')
    return
  }
  await generateOutputs(bundle, pluginName, config)
}

async function generateOutputs(bundle, pluginName, config) {
  const outputOptionsList = [
    {
      format: 'cjs',
      file: path.join(root, 'dist', 'lib', 'index.cjs.js'),
    },
    {
      format: 'iife',
      name: pluginName,
      file: path.join(root, 'dist', 'lib', 'index.iife.js'),
    },
    {
      format: 'umd',
      name: pluginName,
      file: path.join(root, 'dist', 'lib', 'index.umd.js'),
    },
    {
      format: 'es',
      file: path.join(root, 'dist', 'lib', 'index.es.js'),
    },
  ].map((item) => {
    return {
      ...item,
      globals: config.components.globals || {},
    }
  })

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
  // 更新package.json
  // updatePkgJSON(cliOptions.pluginName)
  // genVuets()
  // eslint-disable-next-line
  console.log(chalk.green('构建完成'))
}
