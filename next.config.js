const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    BASE_URL: (() => {
      if (isDev || isProd || isStaging) return 'http://82.208.22.118:8080/adham/api/v1'
      return 'BASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    ORIGIN: phase === PHASE_PRODUCTION_BUILD ? "" : "http://localhost:3000"
  }

  const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    devIndicators: {
      buildActivity: false
    },
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: [],
    },
  };


  const webpack = (config, options) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  }

  return { env, webpack, ...nextConfig }
}
