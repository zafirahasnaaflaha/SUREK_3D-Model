import { accessToken } from "./js/CesiumConfig.js";

Cesium.Ion.defaultAccessToken = accessToken;

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.EllipsoidTerrainProvider(),
});

// ======================
// FOOTPRINT
// ======================

const bangunan = await Cesium.GeoJsonDataSource.load(
    "./data/bangunan4326.geojson",
    {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.LIGHTGRAY.withAlpha(0.6),
        strokeWidth: 1
    }
);

// ======================
// JALAN
// ======================

const jalan = await Cesium.GeoJsonDataSource.load(
    "./data/jalan4326.geojson",
    {
        stroke: Cesium.Color.RED,
        strokeWidth: 3
    }
);

// ======================
// LOD2
// ======================

const lod2 = await Cesium.Cesium3DTileset.fromIonAssetId(
    4959183
);

// ======================
// TAMBAH JALAN SELALU
// ======================

viewer.dataSources.add(jalan);

// ======================
// TAMPILAN AWAL
// ======================

viewer.dataSources.add(bangunan);

await viewer.zoomTo(bangunan);

// ======================
// DROPDOWN
// ======================

const toolbar = document.getElementById("toolbar");

const select = document.createElement("select");

select.className = "cesium-button";

select.innerHTML = `
<option value="footprint">Footprint Bangunan</option>
<option value="lod2">Bangunan LOD 2</option>
`;

toolbar.appendChild(select);

// ======================
// EVENT DROPDOWN
// ======================

select.addEventListener("change", async function () {

    if (this.value === "footprint") {

        // Hapus LOD2
        if (viewer.scene.primitives.contains(lod2)) {
            viewer.scene.primitives.remove(lod2);
        }

        // Tampilkan footprint
        if (!viewer.dataSources.contains(bangunan)) {
            viewer.dataSources.add(bangunan);
        }

        await viewer.zoomTo(bangunan);
    }

    if (this.value === "lod2") {

        // Hilangkan footprint
        viewer.dataSources.remove(bangunan);

        // Tampilkan LOD2
        if (!viewer.scene.primitives.contains(lod2)) {
            viewer.scene.primitives.add(lod2);
        }

        await viewer.zoomTo(lod2);
    }

});