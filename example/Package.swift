// swift-tools-version:5.7.1

import PackageDescription

let package = Package(
    name: "MyExample",
    platforms: [.macOS(.v10_15)],
    products: [
        .library(
            name: "MyExample",
            targets: ["MyExample"]
        ),
    ],
    dependencies: [
        .package(path: "node_modules/node-swift")
    ],
    targets: [
        .target(
            name: "MyExample",
            dependencies: [
                .product(name: "NodeAPI", package: "node-swift")
            ]
        )
    ]
)
