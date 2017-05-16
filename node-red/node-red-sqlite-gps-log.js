[
    {
        "id": "44075de0.432e04",
        "type": "tab",
        "label": "LoRaWAN GPS store"
    },
    {
        "id": "44dd887b.2a7ed8",
        "type": "sqlite",
        "z": "44075de0.432e04",
        "mydb": "8c6ce101.5e038",
        "name": "store sqlite",
        "x": 1346.0001220703125,
        "y": 274,
        "wires": [
            [
                "dc957ca1.0ed0c"
            ]
        ]
    },
    {
        "id": "d08cf39f.7fed3",
        "type": "mqtt in",
        "z": "44075de0.432e04",
        "name": "collect mqtt message",
        "topic": "+/devices/+/up",
        "qos": "2",
        "broker": "cd437da0.eeae7",
        "x": 269.00001525878906,
        "y": 132,
        "wires": [
            [
                "4c48ab8d.afef04"
            ]
        ]
    },
    {
        "id": "dc957ca1.0ed0c",
        "type": "debug",
        "z": "44075de0.432e04",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 1527,
        "y": 274.00006103515625,
        "wires": []
    },
    {
        "id": "4c48ab8d.afef04",
        "type": "json",
        "z": "44075de0.432e04",
        "name": "jsonify payload",
        "x": 563.0000915527344,
        "y": 196,
        "wires": [
            [
                "271decb.4fd2114"
            ]
        ]
    },
    {
        "id": "8c5454f4.617158",
        "type": "function",
        "z": "44075de0.432e04",
        "name": "format sql query",
        "func": "/*jshint multistr: true */\nmsg.topic = \"INSERT INTO messages( \\\n    time, \\\n    dev_id,\\\n    dev_alt,\\\n    dev_lat,\\\n    dev_lon,\\\n    dev_hdop,\\\n    gtw_id,\\\n    gtw_lat,\\\n    gtw_lon,\\\n    gtw_alt,\\\n    rssi\\\n) values (\" +  \n    \"datetime('now'), '\" + \n    msg.payload.dev_id + \"', '\" + \n    msg.payload.payload_fields.alt + \"', '\" + \n    msg.payload.payload_fields.lat + \"', '\" + \n    msg.payload.payload_fields.lon + \"', '\" +\n    msg.payload.payload_fields.hdop + \"', '\" + \n    msg.payload.metadata.gateways[msg.gateway.iterrate].gtw_id + \"', '\" +\n    msg.payload.metadata.gateways[msg.gateway.iterrate].latitude + \"', '\" + \n    msg.payload.metadata.gateways[msg.gateway.iterrate].longitude + \"', '\" + \n    msg.payload.metadata.gateways[msg.gateway.iterrate].altitude + \"', '\" + \n    msg.payload.metadata.gateways[msg.gateway.iterrate].rssi + \n\"');\";\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 1071.0001220703125,
        "y": 249.00003051757812,
        "wires": [
            [
                "44dd887b.2a7ed8",
                "15c3642c.dc8ebc",
                "2dd843.4b96f7be"
            ]
        ]
    },
    {
        "id": "d2860ada.bf7338",
        "type": "inject",
        "z": "44075de0.432e04",
        "name": "Create messages table",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 775.0000610351562,
        "y": 351,
        "wires": [
            [
                "e8396f3e.522df"
            ]
        ]
    },
    {
        "id": "e8396f3e.522df",
        "type": "function",
        "z": "44075de0.432e04",
        "name": "create table if not exists",
        "func": "/*jshint multistr: true */\nmsg.topic = \"CREATE TABLE IF NOT EXISTS messages( \\\n    id INTEGER PRIMARY KEY,\\\n    time NUMERIC NOT NULL,\\\n    dev_id TEXT,\\\n    dev_alt NUMERIC,\\\n    dev_lat NUMERIC,\\\n    dev_lon NUMERIC,\\\n    dev_hdop NUMERIC,\\\n    gtw_id TEXT,\\\n    gtw_lat NUMERIC,\\\n    gtw_lon NUMERIC,\\\n    gtw_alt NUMERIC,\\\n    rssi NUMERIC\\\n    );\";\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 1046.000244140625,
        "y": 350,
        "wires": [
            [
                "44dd887b.2a7ed8"
            ]
        ]
    },
    {
        "id": "f9e19839.f1e758",
        "type": "inject",
        "z": "44075de0.432e04",
        "name": "inject test",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 126,
        "y": 228.00001525878906,
        "wires": [
            [
                "149d8fff.b1d8"
            ]
        ]
    },
    {
        "id": "149d8fff.b1d8",
        "type": "function",
        "z": "44075de0.432e04",
        "name": "create test data",
        "func": "\n\nmsg.topic = \"test_topic/devices/test_dev/up\";\nmsg.payload = \"{ \\\"app_id\\\": \\\"test_topic\\\", \\\"dev_id\\\": \\\"test_dev\\\", \\\"hardware_serial\\\": \\\"00FF00FF00FF00FF\\\", \\\"port\\\": 1, \\\"counter\\\": 42, \\\"payload_raw\\\": \\\"AAAAAAAAAAAA\\\", \\\"payload_fields\\\": { \\\"alt\\\": 99, \\\"hdop\\\": 1.2, \\\"lat\\\": 53.00000000000000, \\\"lon\\\": -3.0000000000000000 }, \\\"metadata\\\": { \\\"time\\\": \\\"2017-05-15T20:45:53.021307334Z\\\", \\\"frequency\\\": 867.5, \\\"modulation\\\": \\\"LORA\\\", \\\"data_rate\\\": \\\"SF7BW125\\\", \\\"coding_rate\\\": \\\"4/5\\\", \\\"gateways\\\": [ { \\\"gtw_id\\\": \\\"eui-00ff00ff00ff00ff\\\", \\\"timestamp\\\": 942999156, \\\"time\\\": \\\"2017-05-15T20:45:53.184586Z\\\", \\\"channel\\\": 5, \\\"rssi\\\": -50, \\\"snr\\\": 5.8, \\\"latitude\\\": 53.000000, \\\"longitude\\\": -2.9000000, \\\"altitude\\\": 25 }, { \\\"gtw_id\\\": \\\"eui-00ff00ff00ff00fe\\\", \\\"timestamp\\\": 942999156, \\\"time\\\": \\\"2017-05-15T20:45:53.184586Z\\\", \\\"channel\\\": 5, \\\"rssi\\\": -50, \\\"snr\\\": 5.8, \\\"latitude\\\": 53.500000, \\\"longitude\\\": -2.9500000, \\\"altitude\\\": 35 } ] } }\";\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 313,
        "y": 227.00004768371582,
        "wires": [
            [
                "4c48ab8d.afef04"
            ]
        ]
    },
    {
        "id": "271decb.4fd2114",
        "type": "function",
        "z": "44075de0.432e04",
        "name": "initiate iterrator",
        "func": "msg.gateway = {};\nmsg.gateway.iterrate = 0;\nmsg.gateway.max = msg.payload.metadata.gateways.length;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 795,
        "y": 224,
        "wires": [
            [
                "8c5454f4.617158"
            ]
        ]
    },
    {
        "id": "4d8e6f8b.9dd51",
        "type": "function",
        "z": "44075de0.432e04",
        "name": "iterrator++",
        "func": "msg.gateway.iterrate += 1;\n\nif (msg.gateway.iterrate >= msg.gateway.max)\n{\n    return null;\n} else {\n    return msg;\n}",
        "outputs": 1,
        "noerr": 0,
        "x": 1131,
        "y": 125,
        "wires": [
            [
                "8c5454f4.617158"
            ]
        ]
    },
    {
        "id": "15c3642c.dc8ebc",
        "type": "delay",
        "z": "44075de0.432e04",
        "name": "wait 100ms",
        "pauseType": "delay",
        "timeout": "100",
        "timeoutUnits": "milliseconds",
        "rate": "10",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 966,
        "y": 125,
        "wires": [
            [
                "4d8e6f8b.9dd51"
            ]
        ]
    },
    {
        "id": "2dd843.4b96f7be",
        "type": "debug",
        "z": "44075de0.432e04",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "gateway",
        "x": 1417,
        "y": 203,
        "wires": []
    },
    {
        "id": "f86a599f.fcacb8",
        "type": "comment",
        "z": "44075de0.432e04",
        "name": "loop through each gateway record",
        "info": "",
        "x": 1060,
        "y": 78,
        "wires": []
    },
    {
        "id": "8c6ce101.5e038",
        "type": "sqlitedb",
        "z": "",
        "db": "/tmp/ttnmapping.sqlite"
    },
    {
        "id": "cd437da0.eeae7",
        "type": "mqtt-broker",
        "z": "",
        "broker": "eu.thethings.network",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": ""
    }
]
