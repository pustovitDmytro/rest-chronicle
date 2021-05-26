## [1.6.2](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.6.1...v1.6.2) (2021-05-26)


### Upgrade

* Bump browserslist from 4.16.4 to 4.16.6 ([906c578](https://github.com/pustovitDmytro/rest-chronicle/commit/906c57832ceaa7a7379f253c0b83c5c30db7d9fe))

## [1.6.1](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.6.0...v1.6.1) (2021-05-21)


### Docs

* update README fixes #20, #29 ([53be9a9](https://github.com/pustovitDmytro/rest-chronicle/commit/53be9a9d307dca90e2de955e7d86835a1f6685d0)), closes [#20](https://github.com/pustovitDmytro/rest-chronicle/issues/20) [#29](https://github.com/pustovitDmytro/rest-chronicle/issues/29)

# [1.6.0](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.5.1...v1.6.0) (2021-05-21)


### New

* adds split chronicle functionality #29 ([b0e673a](https://github.com/pustovitDmytro/rest-chronicle/commit/b0e673ac521de241d10b01e857814ee0563fca44)), closes [#29](https://github.com/pustovitDmytro/rest-chronicle/issues/29)

## [1.5.1](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.5.0...v1.5.1) (2021-05-19)


### Docs

* adds keywords ([c669d57](https://github.com/pustovitDmytro/rest-chronicle/commit/c669d570f17b7c02eaa512f6155ed62ef0c83872))

# [1.5.0](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.4.4...v1.5.0) (2021-05-19)


### Fix

* (lite-repoter) split object keys to new lines for consistency with prior node versions ([ca0cb05](https://github.com/pustovitDmytro/rest-chronicle/commit/ca0cb05cd4629b137755481f284c00e28a56cca4))
* adds cls-hooked to ignore in package-tests ([286e73a](https://github.com/pustovitDmytro/rest-chronicle/commit/286e73af5ae6cd057bf42b0ef64d369de932f0e4))

### New

* adds cls context resolver for supertest #20 ([ca1f96e](https://github.com/pustovitDmytro/rest-chronicle/commit/ca1f96e6774625996d1d7ba5e4445260170ebd91)), closes [#20](https://github.com/pustovitDmytro/rest-chronicle/issues/20)

## [1.4.4](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.4.3...v1.4.4) (2021-05-17)


### Chore

* 'Chore' semanticCommitType for updating devDependencies ([4bf79e1](https://github.com/pustovitDmytro/rest-chronicle/commit/4bf79e1ac2907ca07a355f63458b8bf3b41a3afc))
* (tests) clearCache on module load is optional ([96c2ae5](https://github.com/pustovitDmytro/rest-chronicle/commit/96c2ae5237b7eed47278471cbf3b04b2b99385d4))
* adds appveyor ([d560b4e](https://github.com/pustovitDmytro/rest-chronicle/commit/d560b4ee54ffb8d4d267fd2cb132ba8bb6dfe5b9))
* dont store package-tests artifacts ([50ebff1](https://github.com/pustovitDmytro/rest-chronicle/commit/50ebff16449ff34f474587136dca4e4740ed4bf7))
* integrate APPVEYOR_BUILD_ID to build tests ([16cdd48](https://github.com/pustovitDmytro/rest-chronicle/commit/16cdd48ddb7da5000c6df88ceb1f2513225a4a5b))
* package-tester improvements ([d5d868b](https://github.com/pustovitDmytro/rest-chronicle/commit/d5d868bc7f529d94f79041be5b923b5967d7a704))
* update default renovate rules ([7e83bc4](https://github.com/pustovitDmytro/rest-chronicle/commit/7e83bc4fb9b99bb74811cd55db0b94c81e18dcde))

### Upgrade

* update dependencies [uuid supertest diff] ([79ca509](https://github.com/pustovitDmytro/rest-chronicle/commit/79ca509fe94c892e62950224ee0bfc37f459c09d))

## [1.4.3](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.4.2...v1.4.3) (2021-05-11)


### Upgrade

* Update dependency dot-prop to v6 ([88376a9](https://github.com/pustovitDmytro/rest-chronicle/commit/88376a9e71607dd3b9b09bfade52a42615659243))
* Update dependency js-yaml to v4 ([7f8e67f](https://github.com/pustovitDmytro/rest-chronicle/commit/7f8e67f636415220ff707b2e66c8bb0e8c0ec0ee))

## [1.4.2](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.4.1...v1.4.2) (2021-05-11)


### Chore

* additional quotes in glob pattern ([f6d15cf](https://github.com/pustovitDmytro/rest-chronicle/commit/f6d15cf2b6fc966f1b3a8b175b6bcf0144a80def))
* fixes prevent require handler ([7923f0e](https://github.com/pustovitDmytro/rest-chronicle/commit/7923f0ed71ba537d7c50064a99e2e9af318fcb60))
* not fail package if no tmp exists ([5693813](https://github.com/pustovitDmytro/rest-chronicle/commit/569381326c9b688c492aa29c825a61901419d1de))
* prevent package:test from using devdependencies ([dc896f3](https://github.com/pustovitDmytro/rest-chronicle/commit/dc896f39fd79e6cb73c8cc458213c00f5f5a703d))

### Fix

* fixes module resolving from package fixes #25 #26 ([d6c0839](https://github.com/pustovitDmytro/rest-chronicle/commit/d6c08399569130a972774c29fec86031d242a93f)), closes [#25](https://github.com/pustovitDmytro/rest-chronicle/issues/25) [#26](https://github.com/pustovitDmytro/rest-chronicle/issues/26)

## [1.4.1](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.4.0...v1.4.1) (2021-05-11)


### Upgrade

* Update dependency myrmidon to v1.5.2 ([e832608](https://github.com/pustovitDmytro/rest-chronicle/commit/e8326082a6dc95ba89689d2f5fa2329bee840dd6))

# [1.4.0](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.3.1...v1.4.0) (2021-05-09)


### Chore

* adds Default run test ([415b557](https://github.com/pustovitDmytro/rest-chronicle/commit/415b55704827ee749373a1e5715e976c372fa3c4))
* fixes tests ([50ef6dc](https://github.com/pustovitDmytro/rest-chronicle/commit/50ef6dc13c39c47cd6184569b1ff0d1dbfe6f021))

### Fix

* adds request body to supertest ([3a0afea](https://github.com/pustovitDmytro/rest-chronicle/commit/3a0afea03184cc47e29c4b884dbe2362125dde0a))
* allow empty headers in swagegr ([7b1d1d6](https://github.com/pustovitDmytro/rest-chronicle/commit/7b1d1d690af5c7789a00f6611d3ae8ffb6086e9a))
* fixes blueprint layout ([62a0054](https://github.com/pustovitDmytro/rest-chronicle/commit/62a0054de04a4809f7d1e9f1e54583157947a437))

### New

* headers and identation in api-blueprint ([e094458](https://github.com/pustovitDmytro/rest-chronicle/commit/e0944584b1dfcd0adf71e063432a84360a273320))

## [1.3.1](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.3.0...v1.3.1) (2021-05-08)


### Chore

* (tests) moves load to factory ([4acb941](https://github.com/pustovitDmytro/rest-chronicle/commit/4acb94181777f22e8fda16ea43b6a1cad3986629))
* fixes spellcheck in bugreport ([7d754b6](https://github.com/pustovitDmytro/rest-chronicle/commit/7d754b605ed7fed3ea1a9c7d0d951a09806a1c37))
* set myself as default assignee in pr ([0dcd0ce](https://github.com/pustovitDmytro/rest-chronicle/commit/0dcd0ce95b50a1e8a2fef91307f7fd8964314f68))
* tests/entry.js module resolving ([c840f8b](https://github.com/pustovitDmytro/rest-chronicle/commit/c840f8b479234b7944b2d2708344ae24df231464))
* Update dependency @rollup/plugin-commonjs to v19 ([bf29948](https://github.com/pustovitDmytro/rest-chronicle/commit/bf2994851b033e64744e381f5f566ca9eed0aef5))
* Update dependency json-server to ^0.16.0 ([396c7c1](https://github.com/pustovitDmytro/rest-chronicle/commit/396c7c13766cdf03333009ab6bf25cf1909d9a83))
* update eslint ([4aac03c](https://github.com/pustovitDmytro/rest-chronicle/commit/4aac03c8db5f28d1d41838fc70e614df93e034d6))
* update lock file ([4ffb878](https://github.com/pustovitDmytro/rest-chronicle/commit/4ffb878e544a8cbe68fa7b3c5908b8ccdf9e394f))

### Upgrade

* Update dependency chalk to v4 ([feb992e](https://github.com/pustovitDmytro/rest-chronicle/commit/feb992e553b2e72e24b554f728da0f7ebe4d3257))

# [1.3.0](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.2.2...v1.3.0) (2021-05-05)


### Chore

* (refactor) remove unused argument ([6f28b59](https://github.com/pustovitDmytro/rest-chronicle/commit/6f28b59cefcbae9e6ba3b25eea2a65980daa1d84))
* adds CIRCLE_SKIP_DEPLOY variable ([231549d](https://github.com/pustovitDmytro/rest-chronicle/commit/231549dda35992edbe9732a2848ce6485994214c))
* adds danger to circle-ci ([ae48ac3](https://github.com/pustovitDmytro/rest-chronicle/commit/ae48ac3120c89603fd452b79bc9245e65fdf56c9))
* adds danger token to circle ([82f4156](https://github.com/pustovitDmytro/rest-chronicle/commit/82f4156f972af35775e72f9fca4c0ff374e5364b))
* adds dangerfile to npm ignore ([8842c70](https://github.com/pustovitDmytro/rest-chronicle/commit/8842c70cad5ba463b996988d8928c58dbea1fa2f))
* adds dummy line to calc coverage ([800de67](https://github.com/pustovitDmytro/rest-chronicle/commit/800de67b17a2a5899c2a43d9d16ea0f3774ed642))
* adds jscpd to ignore ([8520cea](https://github.com/pustovitDmytro/rest-chronicle/commit/8520ceadd2d75a90e44f94c6351ebdafc4ef9944))
* adds pr context ([ce163d9](https://github.com/pustovitDmytro/rest-chronicle/commit/ce163d98af7e779af2242418b9d4fe18deeffb36))
* adds test-results to circle-ci ([767c5b3](https://github.com/pustovitDmytro/rest-chronicle/commit/767c5b348a5fe8747604355cf7342fa65b6e3fe3))
* adds tests for prior node versions ([4b00012](https://github.com/pustovitDmytro/rest-chronicle/commit/4b000127879722533f57155ba97adba6a0c04e8d))
* adds trusted bots to danger ([892f4a1](https://github.com/pustovitDmytro/rest-chronicle/commit/892f4a12a0084464da137d25b1a027e4afb808bd))
* deploy ci as single command ([96c2800](https://github.com/pustovitDmytro/rest-chronicle/commit/96c280048128a9879c48d11d3b49b1f3ef60ca77))
* deploy in circle-ci ([a62a5f2](https://github.com/pustovitDmytro/rest-chronicle/commit/a62a5f27f010c0fb083ea73c61979a42996453ac))
* dont pin devDeps in renovate ([5fb0e8d](https://github.com/pustovitDmytro/rest-chronicle/commit/5fb0e8d473117724b74286f57ee1d0281dcb82cb))
* exit code 0 when skip ([f6ee0bf](https://github.com/pustovitDmytro/rest-chronicle/commit/f6ee0bf8f6965f884165f1ebcf83c9ca9a19bb28))
* fill test entry with template ([9177859](https://github.com/pustovitDmytro/rest-chronicle/commit/91778596117f64bde00feeda72b0f7b5dbf7b592))
* fixes Breaking increment in semantic-release ([d1c4d53](https://github.com/pustovitDmytro/rest-chronicle/commit/d1c4d5314eb9921111d4e033ae59e1495e842fa3))
* fixes ci ([0576a01](https://github.com/pustovitDmytro/rest-chronicle/commit/0576a013f537d21591b13214c3cf2c1cf33bfa79))
* Fixes danger-pr in circe-ci ([adff8b3](https://github.com/pustovitDmytro/rest-chronicle/commit/adff8b366b2dc50b880f3d5dedaa05bc8cd9152d))
* fixes renovate config ([05c5bc5](https://github.com/pustovitDmytro/rest-chronicle/commit/05c5bc5a6d90da713d245663319d34cf6519df1f))
* ignoring all for npm packaging ([409201a](https://github.com/pustovitDmytro/rest-chronicle/commit/409201abede4ee9458a430a491c7471a525e976a))
* inverse logical condition ([65dd0ad](https://github.com/pustovitDmytro/rest-chronicle/commit/65dd0ad91e442702ae98993f21163d26270cd4ec))
* multi os tests for travis ([7c8ce28](https://github.com/pustovitDmytro/rest-chronicle/commit/7c8ce28437898910ea7fbf8151a3de346431c482))
* run pr workflow only for pull requests ([03e0b08](https://github.com/pustovitDmytro/rest-chronicle/commit/03e0b0880da9166c7a19fbf6ba171be65af6cbb5))
* split circle ci jobs ([9f75a6b](https://github.com/pustovitDmytro/rest-chronicle/commit/9f75a6b8c1f9002302b367c7a58f5d85f007cc5d))
* telegram notifications on release ([3a8036a](https://github.com/pustovitDmytro/rest-chronicle/commit/3a8036a66d1ad82b978bbb356e0ac0cd1b1d1e46))
* update .renovaterc to automerge after successfull checks ([2e76ceb](https://github.com/pustovitDmytro/rest-chronicle/commit/2e76ceb3dfe909955ef9e4a964312d794d41c4a8))
* Update dependency @rollup/plugin-node-resolve to v13 ([265fd82](https://github.com/pustovitDmytro/rest-chronicle/commit/265fd82a61b0f2ee81bcb445f93e34f05bb4540b))
* Update dependency babel-plugin-module-resolver to v4 ([b8eb86f](https://github.com/pustovitDmytro/rest-chronicle/commit/b8eb86f0d94bf8e81e2c9a37d64698aa9ccfebc5))
* Update dependency eslint to v7 ([0e79e0f](https://github.com/pustovitDmytro/rest-chronicle/commit/0e79e0fa4b2ccb410fd5e6c4648d9280276aeba0))
* Update dependency fs-extra to v10 ([a0adecc](https://github.com/pustovitDmytro/rest-chronicle/commit/a0adecc6b0b58e877bb64aff29e9a42bdc8a9d71))
* Update dependency mocha to v8 ([627a45b](https://github.com/pustovitDmytro/rest-chronicle/commit/627a45bd29e1b5fb1398f539633b54e76175563a))
* Update dependency nyc to v15 ([1caf199](https://github.com/pustovitDmytro/rest-chronicle/commit/1caf199155baa1da46474ec231533a78865d6c19))
* Update dependency uuid to v8 ([ebae34b](https://github.com/pustovitDmytro/rest-chronicle/commit/ebae34b9fc2a074d05600b0e6af2cf3279630508))
* Update issue templates ([8fdb1af](https://github.com/pustovitDmytro/rest-chronicle/commit/8fdb1af8db2dbb2cd8912bef867d62b95781fc56))
* Update pr template ([1d4eb34](https://github.com/pustovitDmytro/rest-chronicle/commit/1d4eb34da6085757d1707db0c440c6e245c3e2e3))
* update semantic to use commit convention ([7e079b2](https://github.com/pustovitDmytro/rest-chronicle/commit/7e079b2eaeb424f55b591b124b7f998a092c0988))
* Update semantic-release monorepo ([b7ab2b1](https://github.com/pustovitDmytro/rest-chronicle/commit/b7ab2b1ad472bc6b20d34cdf527704b3c62ea57b))
* updates semanticCommitType rule ([1a1d119](https://github.com/pustovitDmytro/rest-chronicle/commit/1a1d119cd2c11b843e8d3a7e99eed85695b46df4))
* upgrade circle-ci to 2.1 ([fab79a9](https://github.com/pustovitDmytro/rest-chronicle/commit/fab79a93b2ba07dd088d9d89024b24d5a21f2ac3))
* use danger for internall pr ([d838ede](https://github.com/pustovitDmytro/rest-chronicle/commit/d838edef9a425510615b3405d49b8056176f23d8))
* use incredible eslint config ([b03d74a](https://github.com/pustovitDmytro/rest-chronicle/commit/b03d74a4e8e9ee1dcecba72d2137d70dafbf8b73))
* using static test entry ([21e5b7d](https://github.com/pustovitDmytro/rest-chronicle/commit/21e5b7dbe05b69221d71f5e9cde845028f942209))

### Docs

* adds codefactor badge ([52a2a14](https://github.com/pustovitDmytro/rest-chronicle/commit/52a2a141162707299ffe9106c748c113b1ddd0ab))
* adds Fossa badge ([60a6703](https://github.com/pustovitDmytro/rest-chronicle/commit/60a67033da46b587902189d267d2da6ba011b41b))
* change travis badge to circle-ci ([ebabb61](https://github.com/pustovitDmytro/rest-chronicle/commit/ebabb61f19ac4413561d3ffd849f9392f1c60bb5))
* changes size-url ([ecc2fc2](https://github.com/pustovitDmytro/rest-chronicle/commit/ecc2fc29fa0ad2b353146d18fcf33747f5393230))
* fixes spellcheck ([bc06d85](https://github.com/pustovitDmytro/rest-chronicle/commit/bc06d85a523a2977307c588ee6abe6152c66ef19))
* removes ) from badge ([b986009](https://github.com/pustovitDmytro/rest-chronicle/commit/b9860094fc98fdc00a049d81652d2c9f484ae73d))
* reorder badges ([ed6d250](https://github.com/pustovitDmytro/rest-chronicle/commit/ed6d250fb5cc10c4599f2c50425bf50931d9d560))
* update badges ([ffe57a1](https://github.com/pustovitDmytro/rest-chronicle/commit/ffe57a1289e40b9a10d7354276368253f90fc238))
* update year in license ([1aa3c35](https://github.com/pustovitDmytro/rest-chronicle/commit/1aa3c358528d22e9a8657fa78c41f4cbc9b7bb17))

### Fix

* adds templates to package ([8137595](https://github.com/pustovitDmytro/rest-chronicle/commit/81375953e8cc1fc0e7cd8f1f063777368a95b52b))

### New

* adds circle-ci ([4f55862](https://github.com/pustovitDmytro/rest-chronicle/commit/4f558626db2d5d6c4aaa366c73a4c2a0cc05feb1))
* adds context to circle-ci ([a3a1f33](https://github.com/pustovitDmytro/rest-chronicle/commit/a3a1f33a03d1c32b2d467cdce1d7ab3fb0b8ce8b))
* adds renovate ([1e32c02](https://github.com/pustovitDmytro/rest-chronicle/commit/1e32c027a0c237f0af49a02317687d71fb3a8e76))

### Update

* integrates utils from myrmidon ([f8bb28c](https://github.com/pustovitDmytro/rest-chronicle/commit/f8bb28c02ab264807ac29e160eef3ba9ef5a43e3))

### Upgrade

* Pin dependencies ([848933c](https://github.com/pustovitDmytro/rest-chronicle/commit/848933ce3e04951a6214d8d23abb276b497c7b83))

## [1.2.2](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.2.1...v1.2.2) (2021-04-18)


### Docs

* fixes badges ([76f4f3f](https://github.com/pustovitDmytro/rest-chronicle/commit/76f4f3fd52e97610973dca38c9d4dd937b972c0e))

## [1.2.1](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.2.0...v1.2.1) (2021-04-18)


### Chore

* (refactor) decrease technical debt ([107854f](https://github.com/pustovitDmytro/rest-chronicle/commit/107854fe5fee92250ff85ce78b0fa3855162733b))
* adds commitlint ([38ded63](https://github.com/pustovitDmytro/rest-chronicle/commit/38ded63eb2a1a8e71b9a437d8b784a88dac47543))
* adds danger to validate pr ([7fb7040](https://github.com/pustovitDmytro/rest-chronicle/commit/7fb7040e3b4daa8fc1b419aa88e08118fb43497d))
* adds empty line to pr comment ([36d8a09](https://github.com/pustovitDmytro/rest-chronicle/commit/36d8a0977895e3236213a5c1091fd4c0af3107b4))
* adds lock file lint ([f5a4679](https://github.com/pustovitDmytro/rest-chronicle/commit/f5a467979d6cbb3fa21797fe063deb99c2e6e6d0))
* adds target branch to semantic release ([c4fb3f1](https://github.com/pustovitDmytro/rest-chronicle/commit/c4fb3f1b9ec25425f49b3fd0a17cf68f64429fb4))
* adds technical dept check ([e16a8e2](https://github.com/pustovitDmytro/rest-chronicle/commit/e16a8e2880d894ed0ca6f6125b7be61a90a15768))
* adds tests for packing process ([9b9602d](https://github.com/pustovitDmytro/rest-chronicle/commit/9b9602d2d5e9d869a6555437355325c703ccfb5b))
* change extention of test files to .test.js ([d84ac03](https://github.com/pustovitDmytro/rest-chronicle/commit/d84ac0310ce9f503c9ec05be742f73e2764a1651))
* change tgz label ([5e0e512](https://github.com/pustovitDmytro/rest-chronicle/commit/5e0e51223c0069915e559de8a55a18696254f8fd))
* corrected extglob matching ([72a2201](https://github.com/pustovitDmytro/rest-chronicle/commit/72a22018f8e9875de4194821361602cc432a32b1))
* corrected pack pattern ([273497a](https://github.com/pustovitDmytro/rest-chronicle/commit/273497a050e075200512db9033ee2fe9d973a5f4))
* disable build for coverage check ([0b6e984](https://github.com/pustovitDmytro/rest-chronicle/commit/0b6e9847587f281e0b350bb4f9b6d0d498b4ac82))
* fixes debt typo in travis job ([f9fd463](https://github.com/pustovitDmytro/rest-chronicle/commit/f9fd4631aa300e16128a4d7107d45f9317f70c9b))
* fixes package process ([364e26b](https://github.com/pustovitDmytro/rest-chronicle/commit/364e26b379e6cd94b89776aa0a41abd10a5dc43a))
* pull latest boilerplate ([67e583d](https://github.com/pustovitDmytro/rest-chronicle/commit/67e583d95a8da79f93680466522672b7319dbb1a))
* update semantic release rules ([a075dab](https://github.com/pustovitDmytro/rest-chronicle/commit/a075dabcdd82773ce2d2170e03a3a847f6551c02))
* update travis badge ([e159104](https://github.com/pustovitDmytro/rest-chronicle/commit/e1591042eba97c4b87c923a3a84053eca1e2da4d))
* use native tarball generation ([eeefda5](https://github.com/pustovitDmytro/rest-chronicle/commit/eeefda5daa30eedd1af621c4a0c0efa32f0c9645))

### Docs

* prettify modified_files as markdown list in pr ([6397f60](https://github.com/pustovitDmytro/rest-chronicle/commit/6397f60597573cab04278c8b597b13cdb452773a))
* prettify modified_files list in pr ([ecce71a](https://github.com/pustovitDmytro/rest-chronicle/commit/ecce71a2494382206f983c8370cdd9affbc341a7))

### Fix

* adds missing modules ([fc14911](https://github.com/pustovitDmytro/rest-chronicle/commit/fc1491119302e2f22ba6bc497d69812dcdd21493))
* fixes typo ([4f8ced4](https://github.com/pustovitDmytro/rest-chronicle/commit/4f8ced4f6a9ba7559b68c94d0bcfcf30faa57e45))
* handle axios error intersection ([6dd9fc5](https://github.com/pustovitDmytro/rest-chronicle/commit/6dd9fc5598febd59b7fa419b2c0ed929e95a0ed6))

# [1.2.0](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.1.0...v1.2.0) (2021-02-11)


### Chore

* adds example blog swagger test ([6f30cca](https://github.com/pustovitDmytro/rest-chronicle/commit/6f30ccaa80d8c66b7b6d913b09bc2464816cca1e))

### Fix

* fixes audit ([d7a94e2](https://github.com/pustovitDmytro/rest-chronicle/commit/d7a94e21fd13fb9510544c4fd7bb1cc7a0ea14ef))
* fixes axios run without context ([3a75f84](https://github.com/pustovitDmytro/rest-chronicle/commit/3a75f84c8a72a52e3eeb16ae188fdb5e9e6ed1b7))
* remove undefined params ([9cdba1f](https://github.com/pustovitDmytro/rest-chronicle/commit/9cdba1fe21ea8924220a96c865274387dd4c6388))

### New

* adds draft blog example ([b27f5cb](https://github.com/pustovitDmytro/rest-chronicle/commit/b27f5cbe88e4fadcf168a437b254d1ac5a9d5090))
* adds Raml reporter ([d813701](https://github.com/pustovitDmytro/rest-chronicle/commit/d8137010b5f30009c0c3f3edd3f4dc01188811aa))
* adds rawUrl and urlParams autopass ([f7f547e](https://github.com/pustovitDmytro/rest-chronicle/commit/f7f547ed9ad40d64dd4d233fd2093b5f776e362c))
* interceptors in axios client ([f43898d](https://github.com/pustovitDmytro/rest-chronicle/commit/f43898d39856099c7ea5a7580970360b16169a2a))

# [1.1.0](https://github.com/pustovitDmytro/rest-chronicle/compare/v1.0.0...v1.1.0) (2020-07-28)


### Chore

* adds requests to weather example ([4eeea9b](https://github.com/pustovitDmytro/rest-chronicle/commit/4eeea9be661fa8af99783b5df9e18ecb37b12146))
* fixes changelog generation ([e41d49d](https://github.com/pustovitDmytro/rest-chronicle/commit/e41d49dfe4e2e6a850c4e33d383ed967a313c534))
* improves coverage ([50d5d3b](https://github.com/pustovitDmytro/rest-chronicle/commit/50d5d3b74de4397928e410336ffd60cc9a62c03f))
* tests fixed ([f1c38b0](https://github.com/pustovitDmytro/rest-chronicle/commit/f1c38b0e2870802fce42a9cbfd974511d5d4b194))

### Docs

* adds documentation ([9869b2a](https://github.com/pustovitDmytro/rest-chronicle/commit/9869b2a5b4ab27ed29c0712698e09680df268178))

### Fix

* fixes security audit ([d23b3d5](https://github.com/pustovitDmytro/rest-chronicle/commit/d23b3d54ca58aa0fd77aa81266460c47c332b784))
* fixes supertest tests ([9d762c3](https://github.com/pustovitDmytro/rest-chronicle/commit/9d762c3095aead56bcce9dcf7eca6e989441259f))

### New

* adds lite reporter for express middleware (weather example) ([cb7637c](https://github.com/pustovitDmytro/rest-chronicle/commit/cb7637c04724fe8e7ffb4c73daa3859f43be79fe))

# 1.0.0 (2020-05-07)
