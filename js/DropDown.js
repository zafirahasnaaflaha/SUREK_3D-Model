select.addEventListener("change", async function () {

    // Jalan selalu ada
    if (!viewer.dataSources.contains(jalan)) {
        viewer.dataSources.add(jalan);
    }

    if (this.value === "footprint") {

        viewer.scene.primitives.remove(lod2);

        if (!viewer.dataSources.contains(bangunan)) {
            viewer.dataSources.add(bangunan);
        }

        viewer.zoomTo(bangunan);
    }

    if (this.value === "lod2") {

        viewer.dataSources.remove(bangunan);

        if (!viewer.scene.primitives.contains(lod2)) {
            viewer.scene.primitives.add(lod2);
        }

        viewer.zoomTo(lod2);
    }

});