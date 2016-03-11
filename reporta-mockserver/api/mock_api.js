module.exports = function(apiHandler) {

  apiHandler.mockDataSource = function(res, req) {
    var CAN_sys = {"id": "2", "name" : "CAN_sys"};
    var QNX_sys = {"id": "3", "name" : "QNX_sys"};
    var response = { status: "ok", message: [CAN_sys, QNX_sys]};
    res.json(response);
  };

  apiHandler.mockTrace = function(res, req) {
    var traces = JSON.parse("[   {     \"name\": \"M1-01.asc\",     \"fileName\": \"e26c62007020b30ce77986be601e2604\",     \"type\": \"CAN\",     \"size\": 987971,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 1,     \"status\": \"None\"   },   {     \"name\": \"M1-02.asc\",     \"fileName\": \"d597a792a54559708f616eb9101d4312\",     \"type\": \"CAN\",     \"size\": 919587,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 13,     \"status\": \"None\"   },   {     \"name\": \"M1-03.asc\",     \"fileName\": \"0bd221d005e4dfee29454aaed66cd73a\",     \"type\": \"CAN\",     \"size\": 595017,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 14,     \"status\": \"None\"   },   {     \"name\": \"M10-01.asc\",     \"fileName\": \"14eb9fffba3298d96c82229aa2220316\",     \"type\": \"CAN\",     \"size\": 5064397,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 21,     \"status\": \"None\"   },   {     \"name\": \"M10-02.asc\",     \"fileName\": \"663e62ba4887f0a2e4984cb244697a7b\",     \"type\": \"CAN\",     \"size\": 5099026,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 22,     \"status\": \"None\"   },   {     \"name\": \"M2-01.asc\",     \"fileName\": \"cd7fcd13cdafec307464e534841d6960\",     \"type\": \"CAN\",     \"size\": 580102,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 2,     \"status\": \"None\"   },   {     \"name\": \"M2-02.asc\",     \"fileName\": \"15c86d35a995df963d38da199f6ed21b\",     \"type\": \"CAN\",     \"size\": 535178,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 16,     \"status\": \"None\"   },   {     \"name\": \"M2-03.asc\",     \"fileName\": \"c9a113a08532a81db21fc98335b297d6\",     \"type\": \"CAN\",     \"size\": 593225,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 17,     \"status\": \"None\"   },   {     \"name\": \"M2-07.asc\",     \"fileName\": \"46c4c03550c3fa878a5ff78fad2ca8f3\",     \"type\": \"CAN\",     \"size\": 675520,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 23,     \"status\": \"None\"   },   {     \"name\": \"M9-01.asc\",     \"fileName\": \"54df06cd0e2e329a72f4554a6f5fd0cb\",     \"type\": \"CAN\",     \"size\": 5020486,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 18,     \"status\": \"None\"   },   {     \"name\": \"M9-02.asc\",     \"fileName\": \"bd8eb7d733342132fd3ccdc59e501bf0\",     \"type\": \"CAN\",     \"size\": 4996967,     \"system\": {       \"id\": 2,       \"name\": \"CAN_sys\",       \"createdAt\": \"2015-07-21T18:03:50.536Z\",       \"updatedAt\": \"2015-07-21T18:03:50.536Z\"     },     \"id\": 19,     \"status\": \"None\"   } ]");
    var response = { status: "ok", message: traces};
    res.json(response);
  };

  apiHandler.mockForm = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var dataType = data.param;

    var forms = {};
    forms["Interrupts"] = "<form name=\"intrForm\" class=\"form-horizontal ng-scope ng-invalid ng-invalid-required ng-dirty ng-valid-parse\" ng-submit=\"tab.model.triggerRender()\" style=\"\">   <div class=\"form-group\" ng-show=\"selection.trace\">     <label class=\"col-sm-12\">Select an Interrupt:</label>     <label class=\"col-sm-2 control-label\" for=\"intNumbers\" t-required=\"\"><span class=\"text-info\">* </span>Interrupt number:</label>     <div class=\"col-sm-6\">       <select id=\"intNumbers\" class=\"form-control ng-pristine ng-invalid ng-invalid-required ng-touched\" ng-disabled=\"!options.intr\" ng-options=\"i for i in options.intr\" required=\"\" ng-model=\"selection.interruptId\" style=\"\"><option value=\"?\" selected=\"selected\"></option><option value=\"string:0x00000029\" label=\"0x00000029\">0x00000029</option><option value=\"string:0x0000002d\" label=\"0x0000002d\">0x0000002d</option><option value=\"string:0x0000002e\" label=\"0x0000002e\">0x0000002e</option><option value=\"string:0x00000044\" label=\"0x00000044\">0x00000044</option><option value=\"string:0x00000049\" label=\"0x00000049\">0x00000049</option></select>       <span class=\"text-error ng-hide\" ng-show=\"options.intrWarn\">         No interrupts found.</span>     </div>   </div> </form>";
    forms["DensityMaps"] = "<form name=\"densityForm\" class=\"form-horizontal ng-scope ng-invalid ng-invalid-required ng-dirty ng-valid-parse\" ng-submit=\"tab.model.triggerRender()\" style=\"\">    <!-- Density map is computed for different types of entities based on the system type -->   <div ng-switch=\"systemType\">      <!-- ngSwitchWhen: QNX -->      <!-- ngSwitchWhen: CAN --><div ng-switch-when=\"CAN\" class=\"form-group ng-scope\" ng-show=\"selection.traces\">       <label class=\"col-sm-2 control-label\" for=\"clSelect\" t-required=\"\"><span class=\"text-info\">* </span>Select Event(s):</label>       <div class=\"col-sm-4\">         <select id=\"clSelect\" class=\"form-control ng-pristine ng-invalid ng-invalid-required ng-touched\" multiple=\"true\" required=\"\" ng-disabled=\"!options.events\" ng-options=\"event for event in options.events\" ng-model=\"selection.filters.events\" style=\"\"><option value=\"string:20\" label=\"20\">20</option><option value=\"string:22\" label=\"22\">22</option><option value=\"string:223\" label=\"223\">223</option><option value=\"string:224\" label=\"224\">224</option><option value=\"string:23\" label=\"23\">23</option><option value=\"string:25\" label=\"25\">25</option><option value=\"string:2C1\" label=\"2C1\">2C1</option><option value=\"string:2C4\" label=\"2C4\">2C4</option><option value=\"string:2C6\" label=\"2C6\">2C6</option><option value=\"string:2D0\" label=\"2D0\">2D0</option><option value=\"string:320\" label=\"320\">320</option><option value=\"string:340\" label=\"340\">340</option><option value=\"string:3B2\" label=\"3B2\">3B2</option><option value=\"string:420\" label=\"420\">420</option><option value=\"string:423\" label=\"423\">423</option><option value=\"string:4C1\" label=\"4C1\">4C1</option><option value=\"string:4C3\" label=\"4C3\">4C3</option><option value=\"string:4C6\" label=\"4C6\">4C6</option><option value=\"string:4C7\" label=\"4C7\">4C7</option><option value=\"string:4CE\" label=\"4CE\">4CE</option><option value=\"string:520\" label=\"520\">520</option><option value=\"string:526\" label=\"526\">526</option><option value=\"string:52C\" label=\"52C\">52C</option><option value=\"string:540\" label=\"540\">540</option><option value=\"string:552\" label=\"552\">552</option><option value=\"string:553\" label=\"553\">553</option><option value=\"string:56A\" label=\"56A\">56A</option><option value=\"string:56F\" label=\"56F\">56F</option><option value=\"string:57A\" label=\"57A\">57A</option><option value=\"string:57F\" label=\"57F\">57F</option><option value=\"string:583\" label=\"583\">583</option><option value=\"string:591\" label=\"591\">591</option><option value=\"string:5B8\" label=\"5B8\">5B8</option><option value=\"string:5C8\" label=\"5C8\">5C8</option><option value=\"string:5CD\" label=\"5CD\">5CD</option><option value=\"string:5D2\" label=\"5D2\">5D2</option><option value=\"string:5D4\" label=\"5D4\">5D4</option><option value=\"string:5D5\" label=\"5D5\">5D5</option><option value=\"string:5D7\" label=\"5D7\">5D7</option><option value=\"string:5F8\" label=\"5F8\">5F8</option><option value=\"string:B0\" label=\"B0\">B0</option><option value=\"string:B2\" label=\"B2\">B2</option><option value=\"string:B4\" label=\"B4\">B4</option></select>       </div>     </div><!-- end ngSwitchWhen: -->    </div> </form>";
    forms["IffCooccurInvar"] = "<form name=\"iffCooccurForm\" class=\"form-horizontal ng-scope ng-invalid ng-invalid-required ng-dirty ng-valid-parse\" novalidate=\"\" ng-submit=\"tab.model.triggerRender()\" style=\"\">    <div class=\"form-group\" ng-show=\"selection.traces\">     <label class=\"col-sm-3 control-label\" for=\"evSelect\" t-required=\"\"><span class=\"text-info\">* </span>Event(s): </label>     <div class=\"col-sm-8\">      <select class=\"form-control ng-pristine ng-untouched ng-invalid ng-invalid-required\" multiple=\"true\" id=\"evSelect\" required=\"\" ng-disabled=\"!options.events\" ng-options=\"ev for ev in options.events\" ng-model=\"selection.analysis.events\"><option value=\"string:20\" label=\"20\">20</option><option value=\"string:22\" label=\"22\">22</option><option value=\"string:223\" label=\"223\">223</option><option value=\"string:224\" label=\"224\">224</option><option value=\"string:23\" label=\"23\">23</option><option value=\"string:25\" label=\"25\">25</option><option value=\"string:2C1\" label=\"2C1\">2C1</option><option value=\"string:2C4\" label=\"2C4\">2C4</option><option value=\"string:2C6\" label=\"2C6\">2C6</option><option value=\"string:2D0\" label=\"2D0\">2D0</option><option value=\"string:320\" label=\"320\">320</option><option value=\"string:340\" label=\"340\">340</option><option value=\"string:3B2\" label=\"3B2\">3B2</option><option value=\"string:420\" label=\"420\">420</option><option value=\"string:423\" label=\"423\">423</option><option value=\"string:4C1\" label=\"4C1\">4C1</option><option value=\"string:4C3\" label=\"4C3\">4C3</option><option value=\"string:4C6\" label=\"4C6\">4C6</option><option value=\"string:4C7\" label=\"4C7\">4C7</option><option value=\"string:4CE\" label=\"4CE\">4CE</option><option value=\"string:520\" label=\"520\">520</option><option value=\"string:526\" label=\"526\">526</option><option value=\"string:52C\" label=\"52C\">52C</option><option value=\"string:540\" label=\"540\">540</option><option value=\"string:552\" label=\"552\">552</option><option value=\"string:553\" label=\"553\">553</option><option value=\"string:56A\" label=\"56A\">56A</option><option value=\"string:56F\" label=\"56F\">56F</option><option value=\"string:57A\" label=\"57A\">57A</option><option value=\"string:57F\" label=\"57F\">57F</option><option value=\"string:583\" label=\"583\">583</option><option value=\"string:591\" label=\"591\">591</option><option value=\"string:5B8\" label=\"5B8\">5B8</option><option value=\"string:5C8\" label=\"5C8\">5C8</option><option value=\"string:5CD\" label=\"5CD\">5CD</option><option value=\"string:5D2\" label=\"5D2\">5D2</option><option value=\"string:5D4\" label=\"5D4\">5D4</option><option value=\"string:5D5\" label=\"5D5\">5D5</option><option value=\"string:5D7\" label=\"5D7\">5D7</option><option value=\"string:5F8\" label=\"5F8\">5F8</option><option value=\"string:B0\" label=\"B0\">B0</option><option value=\"string:B2\" label=\"B2\">B2</option><option value=\"string:B4\" label=\"B4\">B4</option></select>     </div>   </div>    <div class=\"form-group\" ng-show=\"selection.traces\">     <label class=\"col-sm-3 control-label\" for=\"exclEvents\" t-required=\"\"><span class=\"text-info\">* </span>Exclude event(s): </label>     <div class=\"col-sm-8\">       <select class=\"form-control ng-pristine ng-valid ng-touched\" id=\"exclEvents\" multiple=\"true\" ng-disabled=\"!options.excludeEvents\" ng-options=\"ev for ev in options.excludeEvents\" ng-model=\"selection.analysis.excludeEvents\" style=\"\"><option value=\"string:20\" label=\"20\">20</option><option value=\"string:22\" label=\"22\">22</option><option value=\"string:223\" label=\"223\">223</option><option value=\"string:224\" label=\"224\">224</option><option value=\"string:23\" label=\"23\">23</option><option value=\"string:25\" label=\"25\">25</option><option value=\"string:2C1\" label=\"2C1\">2C1</option><option value=\"string:2C4\" label=\"2C4\">2C4</option><option value=\"string:2C6\" label=\"2C6\">2C6</option><option value=\"string:2D0\" label=\"2D0\">2D0</option><option value=\"string:320\" label=\"320\">320</option><option value=\"string:340\" label=\"340\">340</option><option value=\"string:3B2\" label=\"3B2\">3B2</option><option value=\"string:420\" label=\"420\">420</option><option value=\"string:423\" label=\"423\">423</option><option value=\"string:4C1\" label=\"4C1\">4C1</option><option value=\"string:4C3\" label=\"4C3\">4C3</option><option value=\"string:4C6\" label=\"4C6\">4C6</option><option value=\"string:4C7\" label=\"4C7\">4C7</option><option value=\"string:4CE\" label=\"4CE\">4CE</option><option value=\"string:520\" label=\"520\">520</option><option value=\"string:526\" label=\"526\">526</option><option value=\"string:52C\" label=\"52C\">52C</option><option value=\"string:540\" label=\"540\">540</option><option value=\"string:552\" label=\"552\">552</option><option value=\"string:553\" label=\"553\">553</option><option value=\"string:56A\" label=\"56A\">56A</option><option value=\"string:56F\" label=\"56F\">56F</option><option value=\"string:57A\" label=\"57A\">57A</option><option value=\"string:57F\" label=\"57F\">57F</option><option value=\"string:583\" label=\"583\">583</option><option value=\"string:591\" label=\"591\">591</option><option value=\"string:5B8\" label=\"5B8\">5B8</option><option value=\"string:5C8\" label=\"5C8\">5C8</option><option value=\"string:5CD\" label=\"5CD\">5CD</option><option value=\"string:5D2\" label=\"5D2\">5D2</option><option value=\"string:5D4\" label=\"5D4\">5D4</option><option value=\"string:5D5\" label=\"5D5\">5D5</option><option value=\"string:5D7\" label=\"5D7\">5D7</option><option value=\"string:5F8\" label=\"5F8\">5F8</option><option value=\"string:B0\" label=\"B0\">B0</option><option value=\"string:B2\" label=\"B2\">B2</option><option value=\"string:B4\" label=\"B4\">B4</option></select>     </div>   </div>    <div class=\"form-group ng-hide\" ng-show=\"selection.analysis.events\">     <label class=\"col-sm-3 control-label\" t-required=\"\"><span class=\"text-info\">* </span>Window size: </label>     <div class=\"col-sm-3\">       <input class=\"form-control ng-pristine ng-untouched ng-valid\" type=\"number\" ng-model=\"selection.analysis.window\">     </div>   </div>   <div class=\"form-group ng-hide\" ng-show=\"selection.analysis.events\">     <label class=\"col-sm-3 control-label\" t-required=\"\"><span class=\"text-info\">* </span>Minimum probability: </label>     <div class=\"col-sm-3\">       <input class=\"form-control ng-pristine ng-untouched ng-valid\" type=\"number\" ng-model=\"selection.analysis.probab\">     </div>   </div> </form>";
    forms["EventRuntimeJitter"] = "<form name=\"jitterForm\" class=\"form-horizontal ng-scope ng-invalid ng-invalid-required ng-dirty ng-valid-parse\" ng-submit=\"tab.model.triggerRender()\" style=\"\">    <div class=\"form-group\" ng-show=\"selection.trace\">     <label class=\"col-sm-2 control-label\" for=\"evSelect\" t-required=\"\"><span class=\"text-info\">* </span>Event:</label>     <div class=\"col-sm-6\">       <select required=\"\" id=\"evSelect\" class=\"form-control ng-pristine ng-invalid ng-invalid-required ng-touched\" ng-disabled=\"!options.startEvents\" ng-options=\"ev for ev in options.startEvents\" ng-model=\"selection.startEvent\" style=\"\"><option value=\"?\" selected=\"selected\"></option><option value=\"string:20\" label=\"20\">20</option><option value=\"string:22\" label=\"22\">22</option><option value=\"string:223\" label=\"223\">223</option><option value=\"string:224\" label=\"224\">224</option><option value=\"string:23\" label=\"23\">23</option><option value=\"string:25\" label=\"25\">25</option><option value=\"string:2C1\" label=\"2C1\">2C1</option><option value=\"string:2C4\" label=\"2C4\">2C4</option><option value=\"string:2C6\" label=\"2C6\">2C6</option><option value=\"string:2D0\" label=\"2D0\">2D0</option><option value=\"string:320\" label=\"320\">320</option><option value=\"string:340\" label=\"340\">340</option><option value=\"string:3B2\" label=\"3B2\">3B2</option><option value=\"string:420\" label=\"420\">420</option><option value=\"string:423\" label=\"423\">423</option><option value=\"string:4C1\" label=\"4C1\">4C1</option><option value=\"string:4C3\" label=\"4C3\">4C3</option><option value=\"string:4C6\" label=\"4C6\">4C6</option><option value=\"string:4C7\" label=\"4C7\">4C7</option><option value=\"string:4CE\" label=\"4CE\">4CE</option><option value=\"string:520\" label=\"520\">520</option><option value=\"string:526\" label=\"526\">526</option><option value=\"string:52C\" label=\"52C\">52C</option><option value=\"string:540\" label=\"540\">540</option><option value=\"string:552\" label=\"552\">552</option><option value=\"string:553\" label=\"553\">553</option><option value=\"string:56A\" label=\"56A\">56A</option><option value=\"string:56F\" label=\"56F\">56F</option><option value=\"string:57A\" label=\"57A\">57A</option><option value=\"string:57F\" label=\"57F\">57F</option><option value=\"string:583\" label=\"583\">583</option><option value=\"string:591\" label=\"591\">591</option><option value=\"string:5B8\" label=\"5B8\">5B8</option><option value=\"string:5C8\" label=\"5C8\">5C8</option><option value=\"string:5CD\" label=\"5CD\">5CD</option><option value=\"string:5D2\" label=\"5D2\">5D2</option><option value=\"string:5D4\" label=\"5D4\">5D4</option><option value=\"string:5D5\" label=\"5D5\">5D5</option><option value=\"string:5D7\" label=\"5D7\">5D7</option><option value=\"string:5F8\" label=\"5F8\">5F8</option><option value=\"string:B0\" label=\"B0\">B0</option><option value=\"string:B2\" label=\"B2\">B2</option><option value=\"string:B4\" label=\"B4\">B4</option></select>     </div>   </div>    <div class=\"form-group\" ng-show=\"selection.trace\">     <label class=\"col-sm-2 control-label\" t-required=\"\"><span class=\"text-info\">* </span>Event:</label>     <div class=\"col-sm-6\">       <select required=\"\" id=\"evEndSelect\" class=\"form-control ng-pristine ng-untouched ng-invalid ng-invalid-required\" ng-disabled=\"!options.endEvents\" ng-options=\"ev for ev in options.endEvents\" ng-model=\"selection.endEvent\"><option value=\"?\" selected=\"selected\"></option><option value=\"string:20\" label=\"20\">20</option><option value=\"string:22\" label=\"22\">22</option><option value=\"string:223\" label=\"223\">223</option><option value=\"string:224\" label=\"224\">224</option><option value=\"string:23\" label=\"23\">23</option><option value=\"string:25\" label=\"25\">25</option><option value=\"string:2C1\" label=\"2C1\">2C1</option><option value=\"string:2C4\" label=\"2C4\">2C4</option><option value=\"string:2C6\" label=\"2C6\">2C6</option><option value=\"string:2D0\" label=\"2D0\">2D0</option><option value=\"string:320\" label=\"320\">320</option><option value=\"string:340\" label=\"340\">340</option><option value=\"string:3B2\" label=\"3B2\">3B2</option><option value=\"string:420\" label=\"420\">420</option><option value=\"string:423\" label=\"423\">423</option><option value=\"string:4C1\" label=\"4C1\">4C1</option><option value=\"string:4C3\" label=\"4C3\">4C3</option><option value=\"string:4C6\" label=\"4C6\">4C6</option><option value=\"string:4C7\" label=\"4C7\">4C7</option><option value=\"string:4CE\" label=\"4CE\">4CE</option><option value=\"string:520\" label=\"520\">520</option><option value=\"string:526\" label=\"526\">526</option><option value=\"string:52C\" label=\"52C\">52C</option><option value=\"string:540\" label=\"540\">540</option><option value=\"string:552\" label=\"552\">552</option><option value=\"string:553\" label=\"553\">553</option><option value=\"string:56A\" label=\"56A\">56A</option><option value=\"string:56F\" label=\"56F\">56F</option><option value=\"string:57A\" label=\"57A\">57A</option><option value=\"string:57F\" label=\"57F\">57F</option><option value=\"string:583\" label=\"583\">583</option><option value=\"string:591\" label=\"591\">591</option><option value=\"string:5B8\" label=\"5B8\">5B8</option><option value=\"string:5C8\" label=\"5C8\">5C8</option><option value=\"string:5CD\" label=\"5CD\">5CD</option><option value=\"string:5D2\" label=\"5D2\">5D2</option><option value=\"string:5D4\" label=\"5D4\">5D4</option><option value=\"string:5D5\" label=\"5D5\">5D5</option><option value=\"string:5D7\" label=\"5D7\">5D7</option><option value=\"string:5F8\" label=\"5F8\">5F8</option><option value=\"string:B0\" label=\"B0\">B0</option><option value=\"string:B2\" label=\"B2\">B2</option><option value=\"string:B4\" label=\"B4\">B4</option></select>     </div>   </div>   <br> </form>";
    forms["CooccurInvar"] = "<form name=\"cooccurForm\" class=\"form-horizontal ng-scope ng-dirty ng-valid-parse ng-valid ng-valid-required\" novalidate=\"\" ng-submit=\"tab.model.triggerRender()\" style=\"\">    <div class=\"form-group\" ng-show=\"selection.traces\">     <label class=\"col-sm-3 control-label\" for=\"evSelect\" t-required=\"\"><span class=\"text-info\">* </span>Event(s): </label>     <div class=\"col-sm-8\">       <select class=\"form-control ng-dirty ng-valid-parse ng-valid ng-valid-required ng-touched\" multiple=\"true\" id=\"evSelect\" required=\"\" ng-disabled=\"!options.events\" ng-options=\"ev for ev in options.events\" ng-model=\"selection.analysis.events\" style=\"\"><option value=\"string:0x00000029\" label=\"0x00000029\">0x00000029</option><option value=\"string:0x0000002d\" label=\"0x0000002d\">0x0000002d</option><option value=\"string:0x0000002e\" label=\"0x0000002e\">0x0000002e</option><option value=\"string:0x00000044\" label=\"0x00000044\">0x00000044</option><option value=\"string:0x00000049\" label=\"0x00000049\">0x00000049</option><option value=\"string:BUFFER\" label=\"BUFFER\">BUFFER</option><option value=\"string:CONNECT_ATTACH/39\" label=\"CONNECT_ATTACH/39\">CONNECT_ATTACH/39</option><option value=\"string:CONNECT_CLIENT_INFO/42\" label=\"CONNECT_CLIENT_INFO/42\">CONNECT_CLIENT_INFO/42</option><option value=\"string:CONNECT_DETACH/40\" label=\"CONNECT_DETACH/40\">CONNECT_DETACH/40</option><option value=\"string:CONNECT_FLAGS/43\" label=\"CONNECT_FLAGS/43\">CONNECT_FLAGS/43</option><option value=\"string:EVENT-0\" label=\"EVENT-0\">EVENT-0</option><option value=\"string:EVENT-1\" label=\"EVENT-1\">EVENT-1</option><option value=\"string:EVENT-2\" label=\"EVENT-2\">EVENT-2</option><option value=\"string:EVENT-3\" label=\"EVENT-3\">EVENT-3</option><option value=\"string:MSG_CURRENT/10\" label=\"MSG_CURRENT/10\">MSG_CURRENT/10</option><option value=\"string:MSG_DELIVER_EVENT/21\" label=\"MSG_DELIVER_EVENT/21\">MSG_DELIVER_EVENT/21</option><option value=\"string:MSG_ERROR\" label=\"MSG_ERROR\">MSG_ERROR</option><option value=\"string:MSG_ERROR/13\" label=\"MSG_ERROR/13\">MSG_ERROR/13</option><option value=\"string:MSG_INFO/19\" label=\"MSG_INFO/19\">MSG_INFO/19</option><option value=\"string:MSG_READV/16\" label=\"MSG_READV/16\">MSG_READV/16</option><option value=\"string:MSG_RECEIVEV/14\" label=\"MSG_RECEIVEV/14\">MSG_RECEIVEV/14</option><option value=\"string:MSG_REPLYV/15\" label=\"MSG_REPLYV/15\">MSG_REPLYV/15</option><option value=\"string:MSG_SENDV/11\" label=\"MSG_SENDV/11\">MSG_SENDV/11</option><option value=\"string:MSG_SENDVNC/12\" label=\"MSG_SENDVNC/12\">MSG_SENDVNC/12</option><option value=\"string:MSG_WRITEV/17\" label=\"MSG_WRITEV/17\">MSG_WRITEV/17</option><option value=\"string:PATHMGR_OPEN\" label=\"PATHMGR_OPEN\">PATHMGR_OPEN</option><option value=\"string:PROCCREATE_NAME\" label=\"PROCCREATE_NAME\">PROCCREATE_NAME</option><option value=\"string:PROCTHREAD_NAME\" label=\"PROCTHREAD_NAME\">PROCTHREAD_NAME</option><option value=\"string:REC_MESSAGE\" label=\"REC_MESSAGE\">REC_MESSAGE</option><option value=\"string:REC_PULSE\" label=\"REC_PULSE\">REC_PULSE</option><option value=\"string:REPLY_MESSAGE\" label=\"REPLY_MESSAGE\">REPLY_MESSAGE</option><option value=\"string:SIGNAL\" label=\"SIGNAL\">SIGNAL</option><option value=\"string:SIGNAL_RETURN/27\" label=\"SIGNAL_RETURN/27\">SIGNAL_RETURN/27</option><option value=\"string:SIGNAL_WAITINFO/32\" label=\"SIGNAL_WAITINFO/32\">SIGNAL_WAITINFO/32</option><option value=\"string:SND_MESSAGE\" label=\"SND_MESSAGE\">SND_MESSAGE</option><option value=\"string:SND_PULSE_EXE\" label=\"SND_PULSE_EXE\">SND_PULSE_EXE</option><option value=\"string:SYNC_CONDVAR_SIG/83\" label=\"SYNC_CONDVAR_SIG/83\">SYNC_CONDVAR_SIG/83</option><option value=\"string:SYNC_CONDVAR_SIGNAL/83\" label=\"SYNC_CONDVAR_SIGNAL/83\">SYNC_CONDVAR_SIGNAL/83</option><option value=\"string:SYNC_CONDVAR_WAIT/82\" label=\"SYNC_CONDVAR_WAIT/82\">SYNC_CONDVAR_WAIT/82</option><option value=\"string:SYNC_MUTEX_LOCK/80\" label=\"SYNC_MUTEX_LOCK/80\">SYNC_MUTEX_LOCK/80</option><option value=\"string:SYNC_MUTEX_UNLOCK/81\" label=\"SYNC_MUTEX_UNLOCK/81\">SYNC_MUTEX_UNLOCK/81</option><option value=\"string:THCONDVAR\" label=\"THCONDVAR\">THCONDVAR</option><option value=\"string:THCREATE\" label=\"THCREATE\">THCREATE</option><option value=\"string:THJOIN\" label=\"THJOIN\">THJOIN</option><option value=\"string:THMUTEX\" label=\"THMUTEX\">THMUTEX</option><option value=\"string:THNANOSLEEP\" label=\"THNANOSLEEP\">THNANOSLEEP</option><option value=\"string:THREADY\" label=\"THREADY\">THREADY</option><option value=\"string:THRECEIVE\" label=\"THRECEIVE\">THRECEIVE</option><option value=\"string:THREPLY\" label=\"THREPLY\">THREPLY</option><option value=\"string:THRUNNING\" label=\"THRUNNING\">THRUNNING</option><option value=\"string:THSEND\" label=\"THSEND\">THSEND</option><option value=\"string:THSIGWAITINFO\" label=\"THSIGWAITINFO\">THSIGWAITINFO</option><option value=\"string:THWAITPAGE\" label=\"THWAITPAGE\">THWAITPAGE</option><option value=\"string:TIME\" label=\"TIME\">TIME</option><option value=\"string:TIMER_ALARM/74\" label=\"TIMER_ALARM/74\">TIMER_ALARM/74</option><option value=\"string:TIMER_TIMEOUT/75\" label=\"TIMER_TIMEOUT/75\">TIMER_TIMEOUT/75</option><option value=\"string:TRACE_EVENT/01\" label=\"TRACE_EVENT/01\">TRACE_EVENT/01</option></select>     </div>   </div>    <div class=\"form-group\" ng-show=\"selection.analysis.events\">     <label class=\"col-sm-3 control-label\" t-required=\"\"><span class=\"text-info\">* </span>Window size: </label>     <div class=\"col-sm-3\">       <input class=\"form-control ng-pristine ng-valid ng-touched\" type=\"number\" ng-model=\"selection.analysis.window\" style=\"\">     </div>   </div>   <div class=\"form-group\" ng-show=\"selection.analysis.events\">     <label class=\"col-sm-3 control-label\" t-required=\"\"><span class=\"text-info\">* </span>Minimum probability: </label>     <div class=\"col-sm-3\">       <input class=\"form-control ng-pristine ng-valid ng-touched\" type=\"number\" ng-model=\"selection.analysis.probab\" style=\"\">     </div>   </div> </form>";

    if (dataType in forms) {
      var response = {status:"ok", message: forms[dataType]};
    }
    else {
      var response = {status:"ok", message: forms["Interrupts"]};
    }

    res.json(response);
  }

  apiHandler.mockDataImage = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    console.log(data);

    var url;

    if(data.dataType == "Interrupts")
      url = "http://localhost:3000/files/chart1.PNG";
    else if (data.dataType == "DensityMaps")
      url = "http://localhost:3000/files/chart2.PNG";
    else if (data.dataType == "IffCooccurInvar")
      url = "http://localhost:3000/files/chart3.PNG";
    else if (data.dataType == "EventRuntimeJitter")
      url = "http://scedc.caltech.edu/Module/Pics/s3iS_off.gif";

    var response = {status:"ok", message: url};

    res.json(response);
  }

  apiHandler.mockDataJSON = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;

    var data = {
      "10p": 10,
      "25p": 17,
      "50p": 22,
      "75p": 26,
      "90p": 30,
      "100p": 36,
      "mean": 22,
      "min": 9,
      "max": 36,
      "data": ["fdsa", "fdsa2", "fdsa3", "fdsa4", "fdsa5"]
    };

    var response = {status:"ok", message: data};

    res.json(response);
  }
};
