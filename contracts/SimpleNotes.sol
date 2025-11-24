// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleNotes {
    struct Note {
        address owner;
        string content;
    }

    Note[] public notes;

    event NoteAdded(address indexed owner, string content);

    function addNote(string memory _content) public {
        require(bytes(_content).length > 0, "Note content cannot be empty");
        notes.push(Note(msg.sender, _content));
        emit NoteAdded(msg.sender, _content);
    }

    function getNoteCount() public view returns (uint256) {
        return notes.length;
    }

    function getNote(uint256 index) public view returns (address owner, string memory content) {
        require(index < notes.length, "Index out of bounds");
        Note storage note = notes[index];
        return (note.owner, note.content);
    }

    function getMyNotes() public view returns (Note[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < notes.length; i++) {
            if (notes[i].owner == msg.sender) {
                count++;
            }
        }

        Note[] memory myNotes = new Note[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < notes.length; i++) {
            if (notes[i].owner == msg.sender) {
                myNotes[j] = notes[i];
                j++;
            }
        }
        return myNotes;
    }
}