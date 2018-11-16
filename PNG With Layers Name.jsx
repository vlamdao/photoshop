var document = app.activeDocument;

var selectedLayers = getSelectedLayers(document);

for (var i = 0; i < selectedLayers.length; i++) {
    selectedLayers[i].selected = true;
    selectedLayers[i].visible = true;
    document.activeLayer = selectedLayers[i];
    savePNG(getFileToSave(document.activeLayer));
    selectedLayers[i].visible = false;
}

function getSelectedLayers(document) {
    var selectedLayers = [];
    groupSelectedLayers();
    var group = document.activeLayer;
    var layersInGroup = group.layers;
    for (var i = 0; i < layersInGroup.length; i++) {
        selectedLayers.push(layersInGroup[i])
    }
    executeAction(app.charIDToTypeID('undo'), undefined, DialogModes.NO);
    return selectedLayers;
}

function groupSelectedLayers() {
    var descriptor = new ActionDescriptor();
    var reference = new ActionReference();

    reference.putClass(app.stringIDToTypeID('layerSection'))
    descriptor.putReference(app.charIDToTypeID('null'), reference);

    lreference = new ActionReference()
    lreference.putEnumerated(
        app.charIDToTypeID('Lyr '),
        app.charIDToTypeID('Ordn'),
        app.charIDToTypeID('Trgt'));
    descriptor.putReference(app.charIDToTypeID('From'), lreference);
        
    executeAction(app.charIDToTypeID('Mk  '), descriptor,  DialogModes.NO);
}

function savePNG(saveFile) {
    var pngOpts = new PNGSaveOptions;
    pngOpts.compression = 0;
    pngOpts.interlaced = false;
    activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);
}

function getFileToSave(layer) {
    var saveFile = File(document.path + "\\" + layer.name + ".png");
    return saveFile;
}
