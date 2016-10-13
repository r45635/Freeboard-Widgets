(function()
{
	// Vincent(dot)Cruvellier(dot)gmail(dot)com
	// Widget to Fisplay My Hue Lights Status
	// 2016
    freeboard.loadWidgetPlugin({
        type_name: "Philips HUE Controls",
        display_name: "Hue Lights",
        description : "Widget to indicate Hue Lights State",
        settings: [
            {
                name: "title",
                display_name: "Title, if empty will be Light Name",
                type: "text"
            },
            {
                name: "light_id",
                display_name: "Light Id",
                type: "number"
            },
            {
                name: "light_data",
                display_name: "Hue Light Data",
                type: "calculated"
            },
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new interactiveIndicator(settings));
        }
    });
   
	freeboard.addStyle('.main_light_svg_.interactive:hover', "box-shadow: 0px 0px 0px #FF9900; cursor: pointer;");

	var LightID = 0;
	
    var interactiveIndicator = function (settings) {
        var self = this;
		var thisHueLightID = "hue_light_" + LightID++;
        var titleElement = $('dddddddd');
        var stateElement = $('<div style="display:inline-block" </div>');
		var lightElement = $('<div style="position: relative;"><div id="main_light_svg_'+LightID+'" style="float: left;style="vertical-align:middle;width="40px";height="40px"><svg version="1.1" id="light_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="45px" viewBox="0 0 80 80" xml:space="preserve"> <g>'+
			'<path d="m35.958,23.688c-9.278,0 -16.804,7.525 -16.804,16.81c0,3.056 0.857,5.898 2.24,8.391c4.126,7.438 5.221,11.613 5.896,15.654c0.564,3.387 1.344,4.174 3.902,4.174c1.091,0 2.869,0 4.766,0c1.901,0 3.683,0 4.767,0c2.563,0 3.344,-0.787 3.907,-4.174c0.677,-4.043 1.771,-8.219 5.896,-15.654c1.388,-2.492 2.24,-5.334 2.24,-8.391c0.003,-9.286 -7.523,-16.81 -16.81,-16.81z" fill="#FFE75A" id="light_main_'+LightID+'"/>'+
			'<path d="m41.971,69.934l-12.013,0c-0.5,0 -0.903,0.402 -0.903,0.9l0,0.602c0,0.496 0.403,0.9 0.903,0.9l12.013,0c0.493,0 0.897,-0.404 0.897,-0.9l0,-0.602c0.002,-0.498 -0.404,-0.9 -0.897,-0.9z" fill="#FFE75A" id="light_base1_'+LightID+'"/>'+
			'<path d="m41.971,73.537l-12.013,0c-0.5,0 -0.903,0.4 -0.903,0.9l0,0.602c0,0.496 0.403,0.898 0.903,0.898l12.013,0c0.493,0 0.897,-0.402 0.897,-0.898l0,-0.602c0.002,-0.499 -0.404,-0.9 -0.897,-0.9z" fill="#FFE75A" id="light_base2_'+LightID+'"/>'+
			'<path d="m41.971,77.141l-12.013,0c-0.5,0 -0.903,0.402 -0.903,0.9l0,0.602c0,0.498 0.403,0.9 0.903,0.9l12.013,0c0.493,0 0.897,-0.402 0.897,-0.9l0,-0.602c0.002,-0.498 -0.404,-0.9 -0.897,-0.9z" fill="#FFE75A" id="light_base3_'+LightID+'"/>'+
			'<path d="m31.458,80.744l9.013,0c0,1.801 -2.406,3.002 -4.513,3.002c-2.097,0 -4.5,-1.201 -4.5,-3.002z" fill="#FFE75A" id="light_base4_'+LightID+'"/>'+
			'<path d="m55.264,11.854c1.532,-2.683 -2.605,-5.092 -4.15,-2.414c-0.809,1.399 -6.662,11.541 -6.662,11.541l4.162,2.402c0,0 5.199,-9.017 6.646,-11.518c0.003,-0.001 0.003,-0.003 0.003,-0.003l0.001,-0.008l0,0z" fill="#FFE75A" id="light_radius1_'+LightID+'"/>'+
			'<path d="m64.633,21.247l0,0l-0.003,0.003c-0.008,0.001 -0.008,0.001 -0.008,0.001c-2.112,1.221 -11.166,6.449 -11.166,6.449l2.397,4.16c0,0 9.076,-5.239 11.188,-6.458c2.686,-1.548 0.275,-5.689 -2.408,-4.155z" fill="#FFE75A" id="light_radius2_'+LightID+'"/>'+
			'<path d="m38.452,6.071c0,0.729 0,12.812 0,12.812l-4.806,0c0,0 0,-12.084 0,-12.812c0,-3.098 4.806,-3.098 4.806,0z" fill="#FFE75A" id="light_radius3_'+LightID+'"/>'+
			'<path d="m16.737,11.854c-1.532,-2.683 2.606,-5.092 4.152,-2.414c0.808,1.399 6.661,11.541 6.661,11.541l-4.158,2.402c0,0 -5.208,-9.017 -6.652,-11.518c0,-0.001 0,-0.003 0,-0.003l-0.003,-0.008l0,0z" fill="#FFE75A" id="light_radius4_'+LightID+'"/>'+
			'<path d="m7.371,21.247l0,0l0,0.003c0.007,0.001 0.007,0.001 0.007,0.001c2.116,1.221 11.167,6.449 11.167,6.449l-2.402,4.16c0,0 -9.076,-5.239 -11.187,-6.458c-2.683,-1.548 -0.273,-5.689 2.415,-4.155z" fill="#FFE75A" id="light_radius5_'+LightID+'"/>'+
			'</svg></div style="float: left;vertical-align:middle;"><div id="light_txtTitle_'+LightID+'">'+ 'Hue Light Id/Name' + '</div>' + 
			'</div>');
	
			
    var currentSettings = settings;
        var isOn = false;
		var isReachable = true;
        var onText;
        var offText;
		var light_id;
		var light_reachable;
		var luminosity = 0;
		var x_color;
		var y_color;
		var id = LightID;
		var light_txtTitle_ = "No Data Acquired";
		

		function componentToHex(c) {
			var hex = c.toString(16);
			return hex.length == 1 ? '0' + hex : hex;
		}
		
		function xyBriToRgb(x, y, bri){
            z = 1.0 - x - y;
            Y = bri / 255.0; // Brightness of lamp
            X = (Y / y) * x;
            Z = (Y / y) * z;
            r = X * 1.612 - Y * 0.203 - Z * 0.302;
            g = -X * 0.509 + Y * 1.412 + Z * 0.066;
            b = X * 0.026 - Y * 0.072 + Z * 0.962;
            r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
            g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
            b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
            maxValue = Math.max(r,g,b);
            r /= maxValue;
            g /= maxValue;
            b /= maxValue;
            r = r * 255;   if (r < 0) { r = 255 };
            g = g * 255;   if (g < 0) { g = 255 };
            b = b * 255;   if (b < 0) { b = 255 };

			return componentToHex(Math.round(r))+componentToHex(Math.round(g))+componentToHex(Math.round(b));
            
        }; 
		

        function updateState() {
			// http://www.colorpicker.com/
			
			if (!(document.getElementById("main_light_svg_"+id))) {
				return;
			}
			var light_baseColor="green";
			var light_radiusColor="red";
			var light_mainColor="white";
					
			if (!(isReachable)) {			
					stateElement.text("NOT CONNECTED");
					light_baseColor="red";
					light_radiusColor="black";
					light_mainColor="#666666";
			}
			else {
				light_baseColor="green";
	            if (isOn) {
					light_radiusColor="white";
                	stateElement.text("ON (" + luminosity + "%)");
				}
				else {
					light_radiusColor="black";
					stateElement.text("OFF");
				}
				light_mainColor = xyBriToRgb(x_color,y_color,luminosity);
			}
			document.getElementById("light_base1_"+id).style.fill=light_baseColor;
			document.getElementById("light_base2_"+id).style.fill=light_baseColor;
			document.getElementById("light_base3_"+id).style.fill=light_baseColor;
			document.getElementById("light_base4_"+id).style.fill=light_baseColor;
			document.getElementById("light_main_"+id).style.fill=light_mainColor;
			document.getElementById("light_radius1_"+id).style.fill=light_radiusColor;
			document.getElementById("light_radius2_"+id).style.fill=light_radiusColor;
			document.getElementById("light_radius3_"+id).style.fill=light_radiusColor;
			document.getElementById("light_radius4_"+id).style.fill=light_radiusColor;
			document.getElementById("light_radius5_"+id).style.fill=light_radiusColor;
			document.getElementById("light_txtTitle_"+id).innerHTML = '<b>'+light_txtTitle_ + '</b><br>  ' + (isReachable ? (isOn ? ("ON ("+luminosity+"%)") : "OFF") : "OFF-LINE") ;
        }


        this.onClick = function(e) { 
            e.preventDefault()		
        }


        this.render = function (element) {
			$(element).append(lightElement); 
            $(lightElement).click(this.onClick.bind(this));
        }

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
			light_id = currentSettings.light_id;
            updateState();
        }
	
        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName == "light_data") {
				light_txtTitle_ = (newValue[light_id - 1].HUE_DATA.name + ' (' + light_id + ')');
                isOn = Boolean(newValue[light_id - 1].HUE_DATA.state.on);
				isReachable = Boolean(newValue[currentSettings.light_id - 1].HUE_DATA.state.reachable);
				luminosity = Math.round(Number(newValue[currentSettings.light_id - 1].HUE_DATA.state.bri / 255 * 100));
				if (luminosity == 0) { luminosity = 1};
				if ((typeof(newValue[currentSettings.light_id - 1].HUE_DATA.state.colormode) != "undefined") && (newValue[currentSettings.light_id - 1].HUE_DATA.state.colormode=="xy"))
				{				
					x_color = newValue[currentSettings.light_id - 1].HUE_DATA.state.xy[0];
					y_color = newValue[currentSettings.light_id - 1].HUE_DATA.state.xy[1];
				} 
				else {
					x_color = 0.3207;
					y_color = 0.3234;
					
				}
				updateState();
            }           
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            return 1;
        }

        this.onSettingsChanged(settings);
    };

}());
