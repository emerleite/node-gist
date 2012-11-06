#!/usr/bin/env node
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var gist = require('../')
    , fs = require('fs')
    , filepath = process.argv[2]
    , desc = process.argv[3]
    ;

  function usage() {
    console.log('Usage: gist </path/to/file>');
  }

  if (!filepath) {
    usage();
    return;
  }

  fs.readFile(filepath, 'utf8', function (err, data) {
    var meta
      , filename = filepath.replace(/.*\//, '')
      ;

    //filename = 'index.js';

    if (err) {
      usage();
      return;
    }

    meta = {
        "description": desc || ""
      , "public": true
      , "files": {}
    };
    meta.files[filename] = { content: data };

    gist().create(meta, function (err, resp, json) {
      if (err) {
        console.error(err);
        return;
      }

      if (json.errors) {
        console.log('[DEBUG]');
        console.log(JSON.stringify(meta, null, '  '));
        console.log('[GIST ERROR]');
        console.log(JSON.stringify(json, null, '  '));
        return;
      }

      console.log('[gist]', json.html_url);
      console.log('[raw]', json.files[filename].raw_url);
      console.log('[git]', json.git_push_url);
    });
  });

  /*
{
  "git_push_url": "git@gist.github.com:3960244.git",
  "user": null,
  "html_url": "https://gist.github.com/3960244",
  "history": [
    {
      "user": null,
      "version": "10564662c34f251be04ac7936758e8ff6c6df4a6",
      "committed_at": "2012-10-26T17:51:27Z",
      "change_status": {
        "additions": 1,
        "total": 1,
        "deletions": 0
      },
      "url": "https://api.github.com/gists/3960244/10564662c34f251be04ac7936758e8ff6c6df4a6"
    }
  ],
  "comments": 0,
  "created_at": "2012-10-26T17:51:27Z",
  "description": null,
  "public": true,
  "forks": [],
  "updated_at": "2012-10-26T17:51:27Z",
  "id": "3960244",
  "url": "https://api.github.com/gists/3960244",
  "files": {
    "index.js": {
      "type": "application/javascript",
      "filename": "index.js",
      "raw_url": "https://gist.github.com/raw/3960244/6b584e8ece562ebffc15d38808cd6b98fc3d97ea/index.js",
      "size": 7,
      "content": "content",
      "language": "JavaScript"
    }
  },
  "git_pull_url": "git://gist.github.com/3960244.git"
}
*/
  

}());
