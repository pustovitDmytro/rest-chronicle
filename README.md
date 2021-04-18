# rest-chronicle
**rest-chronicle** autodocumentate rest api.

[![Version][badge-vers]][npm]
[![Dependencies][badge-deps]][npm]
[![Vulnerabilities][badge-vuln]](https://snyk.io/)
[![Build Status][badge-tests]][travis]
[![Coverage Status][badge-coverage]](https://coveralls.io/github/pustovitDmytro/rest-chronicle?branch=master)
[![License][badge-lic]][github]

## Table of Contents
  - [Motivation](#motivation)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Motivation
A lot of modern rest servers have a lack of up-to-date apidoc. There could be a wide number of reasons for this. 

**rest-chronicle** can help developers keep documentation up-to-date using their existing test coverage, external clients, or even express middleware.

## Requirements
To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `6.0+`
* npm `3.0+`

## Installation

To install the library run following command

```bash
  npm i --save rest-chronicle
```

## Examples

Check full, ready for use, well-tested examples in the [examples folder](./examples).  There currently 2 examples there:
1. [chat app](./examples/chat/app.js): demonstrates apidoc generation using tests with supertest module. [Swagger](examples/chat/documentation/swagger.json) and [api-blueprint](examples/chat/documentation/api-blueprint.md) documentation files will be generated after running [test.js](examples/chat/test.js).
2. [weather app](examples/weather/app.js): generates apidoc as express middleware. [lite](./examples/weather/documentation/api.md) markdown file will be generated after executing requests from the scenario described in [client.js](examples/weather/client.js).

## Usage

### Clients

To capture actions into chronicle use one of the supported clients:

**Axios**

```javascript
    import { axios } from 'rest-chronicle';

    const response = await axios({
        method : 'GET',
        url    : `https://example.com/users`,
        with   : { title: 'List of Users', group: 'Users' }
    });
```

**Express**

```javascript
    import { middlewares } from 'rest-chronicle';
    import express from 'express';

    const chr = middlewares.express();
    const app = express();
    const router = express.Router();
    router.get('/users', chr('Users', 'List of Users'), usersList);
```

check [weather app](./examples/weather/app.js) for complete example

**Supertest**

```javascript
    import { supertest } from 'rest-chronicle';
    import app from './app';

    const request = supertest(app);

    await request
        .with({ title: 'List of Users', group: 'Users' })
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200);
```

check [chat app](./examples/chat/test.js) for complete example

### Reporters

The package provides several reporters under the hood. General reporters api allows to save captured actions in specific format.

To explicitly call save method, use the next approach:
```javascript
import chronicle from 'rest-chronicle';

// capture actions here

await chronicle.save('./documentation/swagger.json', { reporter: 'swagger' });
```
The first argument receives file path, and second - reporter-specific configuration.

Supported reporters:
* **[api-blueprint](https://apiblueprint.org/)**
* **[swagger](https://swagger.io/)**
* **template reporter** - use a custom template (will be filled with handlebars)
* **lite reporter** - markdown file from the template will be generated. The configuration will be passed to inspect method.
* **json reporter** - store captured actions in JSON format with common grouping.

## Contribute

Make the changes to the code and tests and then commit to your branch. Be sure to follow the commit message conventions.

Commit message summaries must follow this basic format:
```
  Tag: Message (fixes #1234)
```

The Tag is one of the following:
* **Fix** - for a bug fix.
* **Update** - for a backwards-compatible enhancement.
* **Breaking** - for a backwards-incompatible enhancement.
* **Docs** - changes to documentation only.
* **Build** - changes to build process only.
* **New** - implemented a new feature.
* **Upgrade** - for a dependency upgrade.
* **Chore** - for tests, refactor, style, etc.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end.


[npm]: https://www.npmjs.com/package/rest-chronicle
[github]: https://github.com/pustovitDmytro/rest-chronicle
[travis]: https://travis-ci.org/pustovitDmytro/rest-chronicle
[coveralls]: https://coveralls.io/github/pustovitDmytro/rest-chronicle?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/rest-chronicle.svg
[badge-tests]: https://img.shields.io/travis/pustovitDmytro/rest-chronicle.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/rest-chronicle.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/rest-chronicle.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/rest-chronicle.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/rest-chronicle/badge.svg?branch=master
