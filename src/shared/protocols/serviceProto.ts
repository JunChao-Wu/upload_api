import { ServiceProto } from 'tsrpc-proto';
import { Reqmerge, Resmerge } from './uploader/Ptlmerge';
import { Requploading, Resuploading } from './uploader/Ptluploading';
import { Reqverify, Resverify } from './uploader/Ptlverify';
import { Reqcontent, Rescontent } from './video/Ptlcontent';
import { Reqoutline, Resoutline } from './video/Ptloutline';

export interface ServiceType {
    api: {
        "uploader/merge": {
            req: Reqmerge,
            res: Resmerge
        },
        "uploader/uploading": {
            req: Requploading,
            res: Resuploading
        },
        "uploader/verify": {
            req: Reqverify,
            res: Resverify
        },
        "video/content": {
            req: Reqcontent,
            res: Rescontent
        },
        "video/outline": {
            req: Reqoutline,
            res: Resoutline
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 11,
    "services": [
        {
            "id": 3,
            "name": "uploader/merge",
            "type": "api"
        },
        {
            "id": 4,
            "name": "uploader/uploading",
            "type": "api"
        },
        {
            "id": 5,
            "name": "uploader/verify",
            "type": "api"
        },
        {
            "id": 8,
            "name": "video/content",
            "type": "api",
            "conf": {
                "all": false
            }
        },
        {
            "id": 7,
            "name": "video/outline",
            "type": "api",
            "conf": {
                "all": false
            }
        }
    ],
    "types": {
        "uploader/Ptlmerge/Reqmerge": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "fileName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "fileHash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "size",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "_type",
                    "type": {
                        "type": "Reference",
                        "target": "uploader/Ptlmerge/fileType"
                    }
                }
            ]
        },
        "uploader/Ptlmerge/fileType": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Literal",
                        "literal": "img"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Literal",
                        "literal": "video"
                    }
                }
            ]
        },
        "uploader/Ptlmerge/Resmerge": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "uploader/Ptluploading/Requploading": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "chunk",
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
                    }
                },
                {
                    "id": 1,
                    "name": "chunkHash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "fileName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "fileHash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "_type",
                    "type": {
                        "type": "Reference",
                        "target": "uploader/Ptluploading/fileType"
                    }
                }
            ]
        },
        "uploader/Ptluploading/fileType": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Literal",
                        "literal": "img"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Literal",
                        "literal": "video"
                    }
                }
            ]
        },
        "uploader/Ptluploading/Resuploading": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "uploader/Ptlverify/Reqverify": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "fileName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "fileHash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "_type",
                    "type": {
                        "type": "Reference",
                        "target": "uploader/Ptlverify/fileType"
                    }
                }
            ]
        },
        "uploader/Ptlverify/fileType": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Literal",
                        "literal": "img"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Literal",
                        "literal": "video"
                    }
                }
            ]
        },
        "uploader/Ptlverify/Resverify": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "isUploaded",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 2,
                    "name": "chunkList",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    },
                    "optional": true
                }
            ]
        },
        "video/Ptlcontent/Reqcontent": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "video/Ptlcontent/Rescontent": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "vcontent",
                    "type": {
                        "type": "Object"
                    }
                }
            ]
        },
        "video/Ptloutline/Reqoutline": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "path",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "video/Ptloutline/Resoutline": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "videos",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Object"
                        }
                    }
                }
            ]
        }
    }
};