addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  class RERS {
    constructor(exploitData,urlParams) {
      this.exploitData = exploitData
      console.clear()
      for (var i in this.exploitData) {
        var a = this.exploitData[i]
        a.CORE.LIB.UNCfract = ((a.CORE.LIB.UNCfract === null || isNaN(a.CORE.LIB.UNCfract)) ? 0 : a.CORE.LIB.UNCfract)
        console.log(a.CORE.LIB.UNCfract)
      }
      this.urlParams = urlParams
    }
    clamp(number, min, max) {
      return Math.max(min, Math.min(number, max));
    }
    rate(app) {
      let a = app
      function calcRandomBS(values, weights) {
        if (values.length !== weights.length) {
          throw new Error("Values and weights arrays must have the same length you fucking idiot.");
        }
  
        let totalValue = 0;
        let totalWeight = 0;
  
        for (let i = 0; i < values.length; i++) {
          totalValue += values[i] * weights[i];
          totalWeight += weights[i];
        }
  
        return totalValue / totalWeight;
      }
      let finalRating = calcRandomBS([
        // UI, 6
        a.UI.script_hub * 100,
        a.UI.explorer * 100,
        a.UI.tabs * 100,
        a.UI.auto_inject * 100,
        a.UI.multiprocess * 100,
        a.UI.debug_console * 100,
        // Core, 4
        (1 - (a.CORE.inject_time / 12)) * 100,
        a.CORE.decompiler * 100,
        a.CORE.LIB.UNC,
        a.CORE.LIB.sUNC,
        100 - a.CORE.LIB.UNCdiff,
        a.CORE.LIB.UNCfract // as opposed to fake unc diff, percent is better for rating
  
      ], [ /*
      DONT DELETE THIS. you literally made this easier to implement
      and then immediately broke RERSv2 on deployment because you deleted
      the beginning array structure here fucking retard. */
  
        // ui
        0,
        0,
        0,
        0,
        0,
        0,
        // core
        0,
        0,
        0,
        0,
        0,
        7
      ])
      if (Math.floor(finalRating) == 69 || Math.round(finalRating) == 69) {
        finalRating += 1.33
      }
      return this.clamp((Math.round(finalRating * 100) / 100), 0, 100) // clamp between 0 and 100
    }
    get(appName) {
      let ratingVal = this.rate(this.exploitData[appName])
      return {
        percentageRating: ratingVal,
        rating: (Math.round(ratingVal)) / 10
      }
    }
    getRaw(appName) {
      let exec = this.exploitData[appName]
      exec["ANKOR"] = this.get(appName)
      return exec
    }
    getAll() {
      let execRatings = {}
      for (let exec in this.exploitData) {
        execRatings[exec] = this.get(exec)
      }
      return execRatings
    }
    getAllRaw() {
      let execRatings = this.exploitData
      for (let exec in this.exploitData) {
        execRatings[exec]["ANKOR"] = this.get(exec)
      }
      return execRatings
    }
    getRanking(sortParam,reverse=false) {
      reverse = !reverse
      let sortedObj;
      if (sortParam.includes(".")) {
        if (reverse) {
          sortedObj = Object.fromEntries(
            Object.entries(this.getAllRaw())
            .sort((a, b) =>
              sortParam.split('.').reduce((acc, part) => acc && acc[part], a[1]) -
              sortParam.split('.').reduce((acc, part) => acc && acc[part], b[1])
            )
            .map(([name, data]) => [
              name,
              sortParam.split('.').reduce((acc, part) => acc && acc[part], data)
            ]).reverse()
          );
        } else {
          sortedObj = Object.fromEntries(
            Object.entries(this.getAllRaw())
            .sort((a, b) =>
              sortParam.split('.').reduce((acc, part) => acc && acc[part], a[1]) -
              sortParam.split('.').reduce((acc, part) => acc && acc[part], b[1])
            )
            .map(([name, data]) => [
              name,
              sortParam.split('.').reduce((acc, part) => acc && acc[part], data)
            ])
          );
        }
      } else {
        sortedObj = Object.fromEntries(
          Object.entries(this.getAllRaw())
            .sort((a, b) => a[1][sortParam] - b[1][sortParam])
            .map(([name, data]) => [name, data[sortParam]]).reverse()
        );
      }
      console.log(sortedObj)
      let sortedArray = [];
      if ("raw" in this.urlParams) {
        for (var key of Object.keys(sortedObj)) {
          let tempKey = {};
          tempKey["name"] = key
          tempKey["rating"] = sortedObj[key]
          tempKey = {...tempKey, ...(this.getRaw(key))}
          sortedArray.push(tempKey)
        }
      } else {
        for (var key of Object.keys(sortedObj)) {
          let tempKey = {};
          tempKey["name"] = key
          tempKey["rating"] = sortedObj[key]
          sortedArray.push(tempKey)
        }
      }
      return sortedArray
    }
  }
  let arequest;
  async function respondJSON(string) {
    let response = arequest
    let corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers' : 'x-worker-key,Content-Type,x-custom-metadata,Content-MD5,x-amz-meta-fileid,x-amz-meta-account_id,x-amz-meta-clientid,x-amz-meta-file_id,x-amz-meta-opportunity_id,x-amz-meta-client_id,x-amz-meta-webhook',
      'Access-Control-Allow-Credentials' : 'true',
      'Allow': 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
      'Content-Type': "application/json"
    };
    
    function addCORSHeaders(response){
      const newResponse = new Response(JSON.stringify(string), {
        headers: corsHeaders,
      });
      return newResponse;
    };
    return addCORSHeaders(response)
  }
  
  async function respondText(string) {
    let response = arequest
    let corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers' : 'x-worker-key,Content-Type,x-custom-metadata,Content-MD5,x-amz-meta-fileid,x-amz-meta-account_id,x-amz-meta-clientid,x-amz-meta-file_id,x-amz-meta-opportunity_id,x-amz-meta-client_id,x-amz-meta-webhook',
      'Access-Control-Allow-Credentials' : 'true',
      'Allow': 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
      'Content-Type': "text/plain"
    };
    
    function addCORSHeaders(response){
      const newResponse = new Response(string, {
        headers: corsHeaders,
      });
      return newResponse;
    };
    return addCORSHeaders(response)
  }
  
  
  String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  async function handleRequest(request) {
    arequest = request
  
    function getNestedValue(obj, path) {
      return path.split('.').reduce((acc, key) => acc?.[key], obj);
    }
  
    function setNestedValue(obj, path, value) {
      var schema = obj;
      var pList = path.split('.');
      var len = pList.length;
      for(var i = 0; i < len-1; i++) {
          var elem = pList[i];
          if( !schema[elem] ) schema[elem] = {}
          schema = schema[elem];
      }
      schema[pList[len-1]] = value;
    }
  
    const customMappings = (await (await fetch("https://ankor.pages.dev/data/custom.json")).json())
    const allExecs = (await (await fetch("https://ankor.pages.dev/data/RERSv2.json")).json())
  
    for (var exec in customMappings) {
      var customExec = (await (await fetch(customMappings[exec]._source)).json())
      allExecs[exec]._AUTOSRC = Math.pow((JSON.stringify(customExec)).hashCode(),2)
      for (var item of customMappings[exec]._map) {
        setNestedValue(allExecs[exec], item[0], getNestedValue(customExec,item[1]))
      }
    }
  
    for (var exec in allExecs) {
      var item = allExecs[exec]
      item.CORE.LIB.UNCdiff = (item.CORE.LIB.UNC - item.CORE.LIB.sUNC)
      item.CORE.LIB.UNCfract = Math.round(((item.CORE.LIB.sUNC / item.CORE.LIB.UNC) * 100) * 100) / 100
    }
  
  
    let rawParams = new URLSearchParams(new URL(request.url).search);
  
    let urlParams = {};
    for (const [key, value] of rawParams) {
      urlParams[key] = value;
    }
    const rers = new RERS(allExecs,urlParams)
  
    if (Object.keys(urlParams).length == 0) {
      return respondText("Welcome to Ankor's API, this will provide you with all the info you need about an executor. To get started, read the documentation at https://ankor.pages.dev/api/docs")
    }
  
  
  
  
  
  
  
    /*
    Everything below is shortcuts to certain info that are commonly
    searched on RERS. This is a big switch statement and utilizes
    fall-through, i.e "best" goes to "top" to "rating" to "ranking"
    and eventually makes it down to ANKOR.rating.
    */
  
    if ("find" in urlParams) {
      urlParams["filter"] = urlParams["find"]
    }
    if ("rank" in urlParams) {
      urlParams["sort"] = urlParams["rank"]
    }
    if ("sort" in urlParams) {
      switch (urlParams["sort"].toLowerCase()) {
        case "best":
        case "top":
        case "rating":
        case "ranking":
        case "good":
          return await respondJSON(rers.getRanking("ANKOR.rating"))
  
        case "worst":
        case "bad":
        case "bottom":
          return await respondJSON(rers.getRanking("ANKOR.rating",true))
  
        case "percent":
        case "rawrating":
        case "percentage":
          return await respondJSON(rers.getRanking("ANKOR.percentageRating"))
  
        case "unc":
        case "functions":
          return await respondJSON(rers.getRanking("CORE.LIB.UNC"))
  
        case "sunc":
        case "sfunctions":
          return await respondJSON(rers.getRanking("CORE.LIB.sUNC"))
  
        case "fakeunc":
        case "func":
        case "fakefunctions":
        case "fakesunc":
          return await respondJSON(rers.getRanking("CORE.LIB.sUNC",true))
  
        case "luarmor":
        case "hasluarmor":
          return await respondJSON(rers.getRanking("CORE.luarmor"))
  
        case "quickest":
        case "fastest":
        case "fast":
          return await respondJSON(rers.getRanking("CORE.inject_time",true))
  
        case "time":
        case "slowest":
        case "slow":
        case "speed":
        case "slowness":
          return await respondJSON(rers.getRanking("CORE.inject_time"))
  
        case "verified":
        case "safe":
        case "real":
        case "element":
        case "certified":
          return await respondJSON(rers.getRanking("INFO.verified_as_safe"))
  
      }
      return await respondJSON(rers.getRanking(urlParams["sort"]))
    }
  
    /*
    end of giant switch statement, start other code for api search handling.
    */
  
  
  
  // DO THIS LATER
  
    if ("filter" in urlParams) {
      let filterReturn = []
      let [keyword, operator, compare] = urlParams["filter"].split(",");
      let execs = rers.getAllRaw()
  
      for (let exec in execs) {
        let item = execs[exec]
        let value = getNestedValue(item, keyword)
        switch (operator) {
          case "=":
            if (String(value) == String(compare)) {
              filterReturn.push(exec)
            }
            break;
          case ">":
            if (parseFloat(value) > parseFloat(compare)) {
              filterReturn.push(exec)
            }
            break;
          case "<":
            if (parseFloat(value) < parseFloat(compare)) {
              filterReturn.push(exec)
            }
            break;
          case "!": 
          case "!=":
            if (String(value) !== String(compare)) {
              filterReturn.push(exec)
            }
            break;
        }
      }
      return await respondJSON(filterReturn)
    }
  
    if ("all" in urlParams) {
      return await respondJSON(rers.getAllRaw())
    }
  
    if ("name" in urlParams) {
      if (urlParams["name"] in rers.getAllRaw()) {
        if ("raw" in urlParams) {
          return await respondJSON(rers.getRaw(urlParams["name"]))
        }
        return await respondJSON(rers.get(urlParams["name"]))
      } else {
        return respondText("Entry not found, try checking spelling and parameters and try again. All entries are case-sensitive and spaced! ('Synapse Z' != 'synapsez')")
      }
    } else {
      return respondText("There was a problem during entry searching, refer to https://ankor.pages.dev/api/docs for more info.")
    }
  
  }
  
  // aaaaaaaaddhfgdghfghngnjy