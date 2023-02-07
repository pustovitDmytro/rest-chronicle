![Logo](.docs/logo_250.png "rest-chronicle")
# rest-chronicle
autodocumentate rest api.

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]
[![Made in Ukraine][ukr-badge]][ukr-link]

## 🇺🇦 Help Ukraine
I woke up on my 26th birthday at 5 am from the blows of russian missiles. They attacked the city of Kyiv, where I live, as well as the cities in which my family and friends live. Now my country is a war zone. 

We fight for democratic values, freedom, for our future! Once again Ukrainians have to stand against evil, terror, against genocide. The outcome of this war will determine what path human history is taking from now on.

💛💙  Help Ukraine! We need your support! There are [dozen ways][ukr-link] to help us, just do it!

## Table of Contents
- [rest-chronicle](#rest-chronicle)
  - [🇺🇦 Help Ukraine](#-help-ukraine)
  - [Table of Contents](#table-of-contents)
  - [Motivation](#motivation)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Examples](#examples)
  - [Usage](#usage)
    - [Clients](#clients)
    - [Reporters](#reporters)
    - [CLS](#cls)
    - [Split](#split)
  - [Migration Guide](#migration-guide)
  - [Contribute](#contribute)

## Motivation
A lot of modern rest servers have a lack of up-to-date apidoc. There could be a wide number of reasons for this. 

**rest-chronicle** can help developers keep documentation up-to-date using their existing test coverage, external clients, or even express middleware.

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.


## Installation

To install the library run the following command

```bash
  npm i --save rest-chronicle
```

## Examples

Check full, ready for use, well-tested examples in the [examples folder](./examples).  There currently 3 examples there:
1. [chat app](./examples/chat/app.js): demonstrates apidoc generation using [mocha](https://www.npmjs.com/package/mocha) tests with **supertest** module. [Swagger](examples/chat/documentation/swagger.json) and [api-blueprint](examples/chat/documentation/api-blueprint.md) documentation files will be generated after running [test.js](examples/chat/test.js).
2. [weather app](examples/weather/app.js): generates apidoc as **express** middleware. [lite](./examples/weather/documentation/api.md) markdown file will be generated after executing requests from the scenario described in [client.js](examples/weather/client.js).
3. [blog app](examples/blog/app.js): demonstrates apidoc generation using [ava](https://www.npmjs.com/package/ava) tests with **axios** requests. [Swagger](examples/blog/documentation/swagger.json) and [Raml](examples/blog/documentation/raml.yaml) documentation files will be generated after running [test.js](examples/blog/blog.test.js).

Real-life projects:
 - https://github.com/pustovitDmytro/sns-telegram-bot

## Usage

### Clients

To capture actions into the chronicle, use one of the supported clients:

**Axios**

```javascript
import chronicle, { Axios } from 'rest-chronicle';

const axios = new Axios(chronicle);

const response = await axios({
    method : 'GET',
    url    : 'https://example.com/users',
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

The package provides several reporters under the hood. General reporters API allows saving captured actions in a specific format.

To explicitly call the save method, use the next approach:
```javascript
import chronicle from 'rest-chronicle';

// capture actions here

await chronicle.save('./documentation/swagger.json', { reporter: 'swagger' });
```
The first argument receives a file path, and the second - reporter-specific configuration.

Supported reporters:
* **[api-blueprint](https://apiblueprint.org/)**
* **[swagger](https://swagger.io/)**
* **[raml](https://raml.org/)**
* **template reporter** - use a custom template (will be filled with handlebars)
* **lite reporter** - markdown file from the template will be generated. The configuration will be passed to inspect method.
* **json reporter** - store captured actions in JSON format with common grouping.

### CLS
if you prefer using **CLS** (Continuation Local Storage) as context storage, enable cls namespace:
```javascript
chronicle.useCLS('cls-namespace-name');
```
Now you can set chronicle context to cls namespace:
```javascript
const ns = cls.createNamespace('cls-supertest-ns');

ns.set('chronicle-context', { title: 'create user', group: 'Users' });
```

Use ```chronicle-context``` as default context key, or specify the custom key as the second argument of ```chronicle.useCLS``` method:

```javascript
chronicle.useCLS('my-cls-namespace', 'my-rest-chronicle-context-key');

ns.set('my-rest-chronicle-context-key', { title: 'update user', group: 'Users' });
```

**Note:** currently only **supertest** client recognizes cls.

### Split
after all actions are captured, it is possible to split chronicle to several instances, based on dynamic criteria.

Examples:
1. move each group to separate chronicle
```javascript
const splitted = chronicle.split(action => {
    return action.group;
});
```
2. store get requests separatelly
```javascript
const splitted = chronicle.split(action => {
    return action.request.method === 'GET' ? 'get' : 'other';
});
```

Now splitted is an Array of chronicle instances. Each instance has ```id``` key and stores only filtered actions.

## Migration Guide

Check [Migration Guide](./MIGRATION.md) to upgrade the next major version. Upgrade to minor/patch versions should happen without additional interventions. See detailed [Changelog](./CHANGELOG.md) for a list of changes.

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.


[npm]: https://www.npmjs.com/package/rest-chronicle
[github]: https://github.com/pustovitDmytro/rest-chronicle
[coveralls]: https://coveralls.io/github/pustovitDmytro/rest-chronicle?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/rest-chronicle.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/rest-chronicle.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/rest-chronicle.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/rest-chronicle.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/rest-chronicle/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/rest-chronicle?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/rest-chronicle/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/rest-chronicle

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/rest-chronicle
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/rest-chronicle

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/rest-chronicle/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/rest-chronicle

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/rest-chronicle

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/rest-chronicle/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/rest-chronicle/?branch=master

[codacy-badge]: https://app.codacy.com/project/badge/Grade/7074b6f5c8e947438db5b1a09b45d5fc
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/rest-chronicle/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/rest-chronicle&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_rest-chronicle&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_rest-chronicle

[npm-downloads-badge]: https://img.shields.io/npm/dw/rest-chronicle
[npm-size-badge]: https://img.shields.io/bundlephobia/min/rest-chronicle
[npm-size-url]: https://bundlephobia.com/result?p=rest-chronicle

[node-ver-test-badge]: https://github.com/pustovitDmytro/rest-chronicle/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/rest-chronicle/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Frest-chronicle.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Frest-chronicle?ref=badge_shield

[ukr-badge]: https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7
[ukr-link]: https://war.ukraine.ua
