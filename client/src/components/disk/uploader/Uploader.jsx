import React from 'react';
import './uploader.scss'
import {useDispatch, useSelector} from "react-redux";
import UploadFile from "./UploadFile";
import {hideUploader} from "../../../reducers/uploadReducer";

const Uploader = () => {
    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.upload.isVisible)
    const files = useSelector(state => state.upload.files)

    //let files = [{id: 1, name: 'file1', progress: 50}, {id: 2, name: 'file2', progress: 0}]

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;