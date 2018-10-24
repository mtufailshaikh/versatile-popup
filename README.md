# Versatile  Popup
TT plugins : versatile popup
```<script type="text/javascript">
    var popup = new ttPlugin.versatileCard({
      header: 'Special Offers',
      showOnLoad: false,
      globalName: 'versatile-unlock-offer-popup',
      customVisible: false
    });
    popup.init();

  </script>
  ```
  Default options:
  ```
    header = '<string>';
    body = '<string>';
    footer = '<string>';
    showOnLoad = boolean; //default to show the popup not arrow
    startDate = null; // starting date to show the widget
    endDate = null; // end date of the widget to hide after passing this date
    globalName =  '<string>'|| false; // popup unique name to target all popup individually if more than one popup
    customVisible = boolean; // show hide popup on other pages based on current status
    ```
