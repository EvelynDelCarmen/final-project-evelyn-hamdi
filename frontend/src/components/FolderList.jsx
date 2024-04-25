
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FolderList = ({ folders }) => {
    const navigate = useNavigate();

    const handleFolderClick = (folder) => {
        navigate(`/gallery/${folder.path}`); // Assuming folder has a 'path' property
    };

    if (!folders || folders.length === 0) {
        return <p>No folders to display.</p>;
    }

    return (
        <div>
            {folders.map((folder) => (
                <button key={folder.path} onClick={() => handleFolderClick(folder)}>
                    {folder.name} {/* Assuming folder has a 'name' property */}
                </button>
            ))}
        </div>
    );
};

export default FolderList;


