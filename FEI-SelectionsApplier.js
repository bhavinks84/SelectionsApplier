define(['jquery', 'qlik', 'css!./FEI-SelectionsApplier.css', './properties'], function ($, qlik, cssContent, properties) {
    return {
        definition: properties,
        paint: function ($element, layout, jquery, properties) {
            var app = qlik.currApp();
            console.log(layout);
            var buttonHTMLCode = '<button name="ApplySelections" onclick="ClearFields();" id="applySelections-' + layout.qInfo.qId + '" class="applySelections">Apply ' + ((layout.field == '') ? '' : '  ' + layout.field) + '</button>';
            var buttonClearCode = '<button id="ClearTextButton" class="ClearTextButton">Clear</button>';
            var textboxHTMLCode = '<textarea class="selections-textarea" id="selectionsTextboxArea-' + layout.qInfo.qId + '"></textarea>';
            $element.html('<table style="height:100%;text-align: center;"><tr style="height: calc(100% - 50px);"><td style="width:100%; height: 100%;">' + textboxHTMLCode + '</td></tr><tr style="height: 50px;"><td style="width:100%; height:100%;"><table><tr><td width="70%">' + buttonHTMLCode + '</td><td>&nbsp;</td><td>' + buttonClearCode + '<td></tr></table></td></tr></table>');
            addOnActivateButtonEvent($element, layout, app);
            var searchField = $element.find(('#selectionsTextboxArea-'+layout.qInfo.qId));            
            $element.find('#ClearTextButton').click(function(){
                searchField.val('');
                app.field(layout.field).clear();
            });
        }
    };
});


//Helper funciton for adding on a "qv-activate" event of button/link
var addOnActivateButtonEvent = function ($element, layout, app) {
    $("#applySelections-" + layout.qInfo.qId).on('qv-activate', function () {
        console.log(layout.field);
        var selectionsInput = document.getElementById("selectionsTextboxArea-" + layout.qInfo.qId).value.split('\n');
        selectionsInput = selectionsInput.filter(function (n) { return n != "" });
        selections = layout.isNumeric ? selectionsInput.map(function (item) { return parseFloat(item); }) : selectionsInput;
        console.log('Selections to be applied are:', selections);
        app.field(layout.field).selectValues(selections, true, true);
    });
};
