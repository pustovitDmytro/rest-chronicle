# Migration Guide

## Upgrade to v2

In v2 `axios` and `supertest` has moved to `peerDependencies`. If you are using one of these requests see the next instructions:

### supertest

install supertest package:

```bash
    npm i -D supertest
```

### axios

install axios package:

```bash
    npm i -D axios
```

1. **if you've used default axios export**:

```javascript
    import { axios } from 'rest-chronicle';

    const response = await axios({
        method : 'GET',
        url    : `https://example.com/users`,
        with   : { title: 'List of Users', group: 'Users' }
    });
```

use constructor instead: 

```javascript
    import { Axios } from 'rest-chronicle';
    const axios = new Axios();

    const response = await axios({
        method : 'GET',
        url    : `https://example.com/users`,
        with   : { title: 'List of Users', group: 'Users' }
    });
```

2. **if you've used Axios class without chronicle**:

```javascript
import { Axios } from 'rest-chronicle';

const axios = new Axios();
```

use explicit `null` instead:

```javascript
import { Axios } from 'rest-chronicle';

const axios = new Axios(null);
```

3. **if you've used Axios class with explicit chronicle**:

```javascript
import chronicle, { Axios } from 'rest-chronicle';

const axios = new Axios(chronicle);
```

keep using, without additional interventions


## Changelog

See detailed [Changelog](./CHANGELOG.md) for a list of changes.
