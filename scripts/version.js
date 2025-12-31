#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Determinar o tipo de build baseado na branch ou variável de ambiente
const branch = process.env.GITHUB_REF_NAME || process.env.BRANCH || 'develop';
const isMain = branch === 'main' || process.env.BUILD_TYPE === 'main';
const isDevelop = branch === 'develop' || process.env.BUILD_TYPE === 'develop';

// Ler package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Gerar versão baseada no tipo
let version;
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

if (isMain) {
    // Versão para main: semântica (major.minor.patch)
    const currentVersion = packageJson.version || '0.0.0';
    const parts = currentVersion.split('.');
    const major = parseInt(parts[0] || '0', 10) || 0;
    const minor = parseInt(parts[1] || '0', 10) || 0;
    const patch = parseInt(parts[2] || '0', 10) || 0;

    // Incrementar patch para releases em main
    version = `${major}.${minor}.${patch + 1}`;
} else if (isDevelop) {
    // Versão para develop: major.minor.patch-dev.timestamp
    const currentVersion = packageJson.version || '0.0.0';
    const [major, minor] = currentVersion.split('.').slice(0, 2);
    version = `${major}.${minor}.0-dev.${timestamp}`;
} else {
    // Versão para feature/hotfix: base-dev.branch.timestamp
    const currentVersion = packageJson.version || '0.0.0';
    const [major, minor] = currentVersion.split('.').slice(0, 2);
    const branchName = branch.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    version = `${major}.${minor}.0-${branchName}.${timestamp}`;
}

// Atualizar package.json
packageJson.version = version;

// Escrever de volta
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Criar arquivo de versão para uso no build
const versionPath = path.join(__dirname, '..', 'src', 'version.json');
fs.writeFileSync(versionPath, JSON.stringify({
    version: version,
    buildDate: new Date().toISOString(),
    branch: branch,
    buildType: isMain ? 'production' : isDevelop ? 'development' : 'feature'
}, null, 2) + '\n');

console.log(`Version set to: ${version}`);
console.log(`Build type: ${isMain ? 'production' : isDevelop ? 'development' : 'feature'}`);
console.log(`Branch: ${branch}`);

// Exportar para uso em outros scripts
process.stdout.write(version);

