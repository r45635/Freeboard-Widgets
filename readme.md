Freeboard HueLight Widget Plugin
===============================

This is a widget plugin for [Freeboard](http://freeboard.io) (open source web ui dashboard) that allows dashboard widget authoring using Hue Light Components from Philips (http://www2.meethue.com/)

![Screenshot] (HueLights/Screenshoot_HueLight_FreeBoard_Widget_1.png "HueLight Widget")

### Basic Explanations
Light/Lamp State Explanations
![Screenshot] (HueLights/Screenshoot_HueLight_FreeBoard_Widget_2.png)

### Utilization
## Plugin Usage
The Data Source requested is also seen in another chapter, we assume here the data source is correctly installed and is name is HUE_LIGHTS.
Here are some explanations on each field of the widget:
- TITLE: field shall not be filled, in this case the HUE_LIGHT Widget will get the information from the Hue Bridge and assigned the name configured for the Light. 
- LIGHT ID: This filed is required, it shall be greater or equal than 1. It represents the Id number of the Light return by the data source.
- HUE LIGHT DATA: that field shall be datasource[“HUE_LIGHTS”]

![Screenshot] (HueLights/Screenshoot_HueLight_FreeBoard_Widget_3.png "HueLight Plugin")

## DataSource Usage
The datasource requested by the widget is a JSON datasource. The JSON data expected are described in the chapter JSON PHP data. Let’s assume at this stage that the JSON data come from a php file named hue.php that you have installed in your home local server.

![Screenshot] (HueLights/Screenshoot_HueLight_FreeBoard_Widget_4.png "HueLight DataSource")


### Installation

## Installation of the JSON PHP HUE file
Look inside the hue.php file, there is a configuration to perform:  set your IP Hue Bridge API and set your API Key.
This php script provide whole information of the Lights from the Hue Bridge controller.

## Installation of the HUE LIGHT Widget
Edit the file index.html at the root of the freeboard directory and modify the script bloc like below :

  ```
    <script type="text/javascript">
        head.js("js/freeboard_plugins.min.js",
	"plugins/freeboard/lights_hue.js",
                // *** Load more plugins here ***
                function(){
                    $(function()
                    { //DOM Ready
                        freeboard.initialize(true);

                        var hashpattern = window.location.hash.match(/(&|#)source=([^&]+)/);
                        if (hashpattern !== null) {
                            $.getJSON(hashpattern[2], function(data) {
                                freeboard.loadDashboard(data, function() {
                                    freeboard.setEditing(false);
                                });
                            });
                        }

                    });
                });
    </script>
  ```
 
Copy the file lights_hue..js in the plugins/freeboard/ folder.


Enjoy !
