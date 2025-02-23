// metro.config.js
import { getDefaultConfig } from '@expo/metro-config'

const config = getDefaultConfig(__dirname)

const { transformer, resolver } = config

config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer')
}

config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'png', 'cjs']
}

export default config
