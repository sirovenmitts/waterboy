const subsCache = global.subsCache = new SubsCache(5, 10)

Blaze.registerHelper('subsReady', subsCache.ready.bind(subsCache))