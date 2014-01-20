/// <reference path="../../lib/scripts/assets.d.ts" />

//Note: Hardcoded dependencies for now.
angular.module('dotjem.blog',
    [ 'dotjem.routing',
//      'dotjem.blog.auth',
      'dotjem.blog.home',
      'dotjem.blog.blog',
      'dotjem.blog.gallery',
      'dotjem.blog.portfolio',
      'dotjem.blog.about'
//      'dotjem.blog.search',
//      'dotjem.blog.admin'
    ]);

