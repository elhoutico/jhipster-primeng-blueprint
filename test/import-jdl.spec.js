const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const rimraf = require('rimraf');
const importJdl = require('generator-jhipster/cli/import-jdl');
const walker = require('./path-walker');

const noopFork = () => ({
    on(code, cb) {
        cb(0);
    }
});

let testDir = '/tmp/primeng-blueprint-test';
describe('import-jdl of primeng-blueprint JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            rimraf.sync(testDir);
            helpers
                .run('generator-jhipster/generators/app')
                .inDir(testDir, dir => {
                    // importJdl doesn't haev a call back there we call the generators manually after it updates the json files
                    testDir = dir;
                    fse.copySync(path.join(__dirname, '../test/templates/primeng-blueprint-test'), dir);
                    importJdl(['jhipster.jh'], { skipInstall: true, noInsight: true, interactive: false, 'skip-git': false }, {}, noopFork);
                })
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'primeng-blueprint',
                    skipChecks: true,
                    withEntities: true
                })
                .withGenerators([
                    [
                        require('../generators/client'), // eslint-disable-line global-require
                        'jhipster-primeng-blueprint:client',
                        path.join(__dirname, '../generators/client/index.js')
                    ],
                    [
                        require('../generators/entity-client'), // eslint-disable-line global-require
                        'jhipster-primeng-blueprint:entity-client',
                        path.join(__dirname, '../generators/entity-client/index.js')
                    ],
                    [
                        require('../generators/entity-i18n'), // eslint-disable-line global-require
                        'jhipster-primeng-blueprint:entity-i18n',
                        path.join(__dirname, '../generators/entity-i18n/index.js')
                    ]
                ])
                .on('end', done);
        });

        it('it works', () => {
            // eslint-disable-next-line no-console
            console.log(testDir);
            const basePath = path.join(__dirname, './samples/primeng-blueprint-test');
            const filesToTest = [`${basePath}/src/main/`, `${basePath}/src/test/`];
            filesToTest.forEach(file =>
                walker.walk(file).forEach(f => {
                    assert.file(path.join(testDir, f.substring(basePath.length)));
                    assert.textEqual(
                        fs.readFileSync(path.join(testDir, f.substring(basePath.length)), 'UTF-8'),
                        fs.readFileSync(path.join(basePath, f.substring(basePath.length)), 'UTF-8')
                    );
                })
            );
        });
    });
});
