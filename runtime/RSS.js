const getRSS = require("feed-read");

module.exports = (url, num, callback) => {
     if (typeof (callback) == "function") {
          const handleError = err => {
               callback(err);
          };
          try {
               getRSS(url, (err, articles) => {
                    if (err) {
                         handleError(err);
                    } else {
                         callback(err, articles.slice(0, num));
                    }
               })
          } catch (err) {
               handleError(err);
          }
     }
};