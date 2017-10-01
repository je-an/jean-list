({
    baseUrl: '.',
    out: 'dist/List.js',
    optimize: 'none',
    name: "node_modules/jean-amd/dist/jean-amd.min",
    include: ["src/List"],
    wrap: {
        start: 
        "(function (root, factory) { \n" +
        " \t if (typeof define === 'function' && define.amd) { \n" +
        "\t \t define([], factory); \n" +
        "\t} else { \n" +
        "\t \troot.List = root.List || {}; \n" +
        "\t \troot.List = factory();\n" +
        "\t}\n" +
        "}(this, function() {",
        end:
        "\n \t return require('src/List'); \n" +
        "}));"
    },
    paths:{
        TypeCheck: "node_modules/jean-type-check/src/TypeCheck"
    }
})