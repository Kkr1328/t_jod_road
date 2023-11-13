// source: parking-space.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.parkingSpace.Empty', null, global);
goog.exportSymbol('proto.parkingSpace.ParkingSpace', null, global);
goog.exportSymbol('proto.parkingSpace.ParkingSpaceList', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.parkingSpace.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.parkingSpace.Empty, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.parkingSpace.Empty.displayName = 'proto.parkingSpace.Empty';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.parkingSpace.ParkingSpace = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.parkingSpace.ParkingSpace, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.parkingSpace.ParkingSpace.displayName = 'proto.parkingSpace.ParkingSpace';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.parkingSpace.ParkingSpaceList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.parkingSpace.ParkingSpaceList.repeatedFields_, null);
};
goog.inherits(proto.parkingSpace.ParkingSpaceList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.parkingSpace.ParkingSpaceList.displayName = 'proto.parkingSpace.ParkingSpaceList';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.parkingSpace.Empty.prototype.toObject = function(opt_includeInstance) {
  return proto.parkingSpace.Empty.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.parkingSpace.Empty} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.parkingSpace.Empty.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.parkingSpace.Empty}
 */
proto.parkingSpace.Empty.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.parkingSpace.Empty;
  return proto.parkingSpace.Empty.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.parkingSpace.Empty} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.parkingSpace.Empty}
 */
proto.parkingSpace.Empty.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.parkingSpace.Empty.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.parkingSpace.Empty.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.parkingSpace.Empty} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.parkingSpace.Empty.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.parkingSpace.ParkingSpace.prototype.toObject = function(opt_includeInstance) {
  return proto.parkingSpace.ParkingSpace.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.parkingSpace.ParkingSpace} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.parkingSpace.ParkingSpace.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    lat: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    lng: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    available: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.parkingSpace.ParkingSpace}
 */
proto.parkingSpace.ParkingSpace.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.parkingSpace.ParkingSpace;
  return proto.parkingSpace.ParkingSpace.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.parkingSpace.ParkingSpace} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.parkingSpace.ParkingSpace}
 */
proto.parkingSpace.ParkingSpace.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setLat(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setLng(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAvailable(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.parkingSpace.ParkingSpace.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.parkingSpace.ParkingSpace.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.parkingSpace.ParkingSpace} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.parkingSpace.ParkingSpace.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getLat();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getLng();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getAvailable();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.parkingSpace.ParkingSpace.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.parkingSpace.ParkingSpace} returns this
 */
proto.parkingSpace.ParkingSpace.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.parkingSpace.ParkingSpace.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.parkingSpace.ParkingSpace} returns this
 */
proto.parkingSpace.ParkingSpace.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional double lat = 3;
 * @return {number}
 */
proto.parkingSpace.ParkingSpace.prototype.getLat = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.parkingSpace.ParkingSpace} returns this
 */
proto.parkingSpace.ParkingSpace.prototype.setLat = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double lng = 4;
 * @return {number}
 */
proto.parkingSpace.ParkingSpace.prototype.getLng = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.parkingSpace.ParkingSpace} returns this
 */
proto.parkingSpace.ParkingSpace.prototype.setLng = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double available = 5;
 * @return {number}
 */
proto.parkingSpace.ParkingSpace.prototype.getAvailable = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.parkingSpace.ParkingSpace} returns this
 */
proto.parkingSpace.ParkingSpace.prototype.setAvailable = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.parkingSpace.ParkingSpaceList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.parkingSpace.ParkingSpaceList.prototype.toObject = function(opt_includeInstance) {
  return proto.parkingSpace.ParkingSpaceList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.parkingSpace.ParkingSpaceList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.parkingSpace.ParkingSpaceList.toObject = function(includeInstance, msg) {
  var f, obj = {
    parkingspacelistList: jspb.Message.toObjectList(msg.getParkingspacelistList(),
    proto.parkingSpace.ParkingSpace.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.parkingSpace.ParkingSpaceList}
 */
proto.parkingSpace.ParkingSpaceList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.parkingSpace.ParkingSpaceList;
  return proto.parkingSpace.ParkingSpaceList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.parkingSpace.ParkingSpaceList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.parkingSpace.ParkingSpaceList}
 */
proto.parkingSpace.ParkingSpaceList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.parkingSpace.ParkingSpace;
      reader.readMessage(value,proto.parkingSpace.ParkingSpace.deserializeBinaryFromReader);
      msg.addParkingspacelist(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.parkingSpace.ParkingSpaceList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.parkingSpace.ParkingSpaceList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.parkingSpace.ParkingSpaceList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.parkingSpace.ParkingSpaceList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getParkingspacelistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.parkingSpace.ParkingSpace.serializeBinaryToWriter
    );
  }
};


/**
 * repeated ParkingSpace parkingSpaceList = 1;
 * @return {!Array<!proto.parkingSpace.ParkingSpace>}
 */
proto.parkingSpace.ParkingSpaceList.prototype.getParkingspacelistList = function() {
  return /** @type{!Array<!proto.parkingSpace.ParkingSpace>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.parkingSpace.ParkingSpace, 1));
};


/**
 * @param {!Array<!proto.parkingSpace.ParkingSpace>} value
 * @return {!proto.parkingSpace.ParkingSpaceList} returns this
*/
proto.parkingSpace.ParkingSpaceList.prototype.setParkingspacelistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.parkingSpace.ParkingSpace=} opt_value
 * @param {number=} opt_index
 * @return {!proto.parkingSpace.ParkingSpace}
 */
proto.parkingSpace.ParkingSpaceList.prototype.addParkingspacelist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.parkingSpace.ParkingSpace, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.parkingSpace.ParkingSpaceList} returns this
 */
proto.parkingSpace.ParkingSpaceList.prototype.clearParkingspacelistList = function() {
  return this.setParkingspacelistList([]);
};


goog.object.extend(exports, proto.parkingSpace);