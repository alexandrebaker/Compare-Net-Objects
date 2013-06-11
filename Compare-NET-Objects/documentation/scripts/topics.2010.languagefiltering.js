/* Language Filtering */

var curLang = '';
var languageNames;
var languageStates;

function configureLanguageCheckboxes() {
    var checkbox;

    for (var i = 0; i < languageNames.length; i++) {
        checkbox = documentElement(languageNames[i] + "Checkbox");

        if (languageStates[i] == "on") {
            checkbox.checked = true;
        }
        else {
            checkbox.checked = false;
        }
    }
}

function setLanguage(key) {
    var languageName = key.id.substring(0, key.id.indexOf("Checkbox"));

    if (getLanguageState(languageName) == "on") {
        // Always have at least one selected
        if (getLanguageTickedCount() == 1) {
            key.checked = true;
            return;
        }

        setLanguageState(languageName, "off");
        key.checked = false;
    }
    else {
        setLanguageState(languageName, "on");
        key.checked = true;
    }

    // Update the content to reflect the new language filter
    displayLanguages();
}

function displayLanguages() {
    var pres = document.getElementsByTagName("DIV");
    var pre;
    var found;
    var languageName;

    if (pres) {
        for (var iPre = 0; iPre < pres.length; iPre++) {
            pre = pres[iPre];

            if (pre.id && pre.className) {
                if (pre.className == "LanguageSpecific"
                    || (pre.className.indexOf("DxTab ") == 0 && pre.className.length == 5)
                    || pre.className.lastIndexOf("DxTab") == pre.className.length - 5) {
                    
                    found = true;

                    if (pre.id.substring(pre.id.length - 1, pre.id.length) != "_") {
                        for (var i = 0; i < languageNames.length; i++) {
                            if (languageStates[i] == "off") {
                                languageName = languageNames[i].toUpperCase();

                                // For each language specific element except the Syntax, treat CPP2005 as CPP
                                if (languageName == "CPP2005" && pre.id.toUpperCase().indexOf("SYNTAX") == -1) {
                                    languageName = "CPP";
                                }

                                if (doesIdContainLanguageName(pre.id, languageName)) {
                                    found = false;
                                    break;
                                }
                                else if (languageName == "VB" && doesIdContainLanguageName(pre.id, "VBALL")) {
                                    found = false;
                                    break;
                                }
                            }
                        }
                    }

                    if (found) {
                        pre.style.display = "block";
                    }
                    else {
                        pre.style.display = "none";
                    }
                }
            }
        }
    }

    changeLanguageFilterLabel();
}

function doesIdContainLanguageName(id, languageName)
{
    return ((id.toUpperCase().indexOf(languageName) != -1 
             && id.toUpperCase().indexOf(languageName) == (id.length - languageName.length)) 
           || (id.toUpperCase().indexOf(languageName + ".NET") != -1 
             && id.toUpperCase().indexOf(languageName + ".NET") == (id.length - languageName.length - 4)))
}

function getLanguageState(LanguageName) {
    for (var i = 0; i < languageNames.length; i++) {
        if (languageNames[i] == LanguageName) {
            return (languageStates[i]);
        }
    }
}

function setLanguageState(LanguageName, Value) {
    for (var i = 0; i < languageNames.length; i++) {
        if (languageNames[i] == LanguageName) {
            languageStates[i] = Value;
        }
    }
}

function getLanguageTickedCount() {
    var tickedCount = 0;
    var labelElement;

    for (var i = 0; i < languageNames.length; i++) {
        if (languageStates[i] == "on") {
            tickedCount++;
        }
    }

    return (tickedCount);
}

function changeLanguageFilterLabel() {
    var tickedCount = 0;
    var labelElement;
    var languageName;

    if (!document.getElementById("ShowAllLabel")) {
        return;
    }

    for (var i = 0; i < languageNames.length; i++) {
        if (languageStates[i] == "on") {
            tickedCount++;
        }

        labelElement = documentElement(languageNames[i] + "label");

        if (labelElement != null) {
            labelElement.style.display = "none";
        }
    }

    document.getElementById("ShowAllLabel").style.display = "none";
    document.getElementById("MultipleLabel").style.display = "none";

    if (tickedCount == languageNames.length) {
        document.getElementById("ShowAllLabel").style.display = "inline";
    }
    else if ((tickedCount > 1) && (tickedCount < languageNames.length)) {
        if ((tickedCount == 2) && (getLanguageState("VB") == "on") && (getLanguageState("vbUsage") == "on")) {
            document.getElementById("VBLabel").style.display = "inline";
        }
        else {
            document.getElementById("MultipleLabel").style.display = "inline";
        }
    }
    else if (tickedCount == 1) {
        for (var i = 0; i < languageNames.length; i++) {
            if (languageStates[i] == "on") {
                if (languageNames[i] == "vbUsage") {
                    languageName = "VB";
                }
                else {
                    languageName = languageNames[i];
                }

                document.getElementById(languageName + "Label").style.display = "inline";
            }
        }
    }
}

function loadLanguages() {
    var languageName;
    var language;
    var allNull;

    // Build an array of this pages language names and state
    languageNames = new Array();
    languageStates = new Array();

    var elements = document.getElementsByName("LanguageFilter");

    allNull = true;

    for (var i = 0; i < elements.length; i++) {
        var input = elements[i];

        languageNames[i] = input.id.substring(0, input.id.indexOf("Checkbox"));
        var value = dxGetSetting("lang_" + languageNames[i]);

        if (value == null) {
            languageStates[i] = "on";
        }
        else {
            allNull = false;
            languageStates[i] = value;
        }
    }

    // If no language preference has been established and we have an indicator of the current
    //  language, set the languages filtered to only the current language
    if (allNull && curLang.length > 0) {
        for (var i = 0; i < elements.length; i++) {
            if (languageNames[i].toUpperCase() == curLang.toUpperCase()) {
                languageStates[i] = "on";
            }
            else {
                languageStates[i] = "off";
            }
        }
    }
    
    document.body.onclick = bodyClick;
}

function saveLanguages() {
    if (languageNames) {
        for (var i = 0; i < languageNames.length; i++) {
            var value = languageStates[i];
            dxSaveSetting("lang_" + languageNames[i], value);
        }
    }
}

/* End Language Filtering */

/* Alias to Topic save / load functions */
function dxSaveSetting(name,value) {
    save(name,value);
}

function dxGetSetting(name) {
    return load(name)
}
/* End Alias to Topic save / load functions */