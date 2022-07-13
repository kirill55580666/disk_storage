import React from 'react';
import './file.scss'
import DirLogo from '../../../../assets/img/dir.svg'
import FileLogo from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file-action";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    const transformDate = (date) => {
        const firstStr = date.slice(0, 10)
        const secondStr = date.slice(11, 19)
        return firstStr + ' ' + secondStr
    }

    function openDirHandler() {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className='file' onClick={file.type === 'dir' ? () => openDirHandler() : () => {
            }}>
                <img src={file.type === 'dir' ? DirLogo : FileLogo} alt="" className='file__img'/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{transformDate(file.date)}</div>
                <div className="file__size">{file.type !== 'dir' ? sizeFormat(file.size) : ''}</div>
                {file.type !== 'dir' &&
                <button className="file__button file__download" onClick={(e) => downloadClickHandler(e)}>
                    download
                </button>
                }
                <button className="file__button file__delete" onClick={(e) => deleteClickHandler(e)}>delete</button>
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={file.type === 'dir' ? () => openDirHandler() : () => {
            }}>
                <img src={file.type === 'dir' ? DirLogo : FileLogo} alt="" className='file-plate__img'/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    <button className="file-plate__button file-plate__download"
                            onClick={(e) => downloadClickHandler(e)}>
                        download
                    </button>
                    }
                    <button className="file-plate__button file-plate__delete"
                            onClick={(e) => deleteClickHandler(e)}>delete
                    </button>
                </div>
            </div>)
    }
};

export default File;