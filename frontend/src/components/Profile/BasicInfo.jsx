import { MenuItem, TextField } from '@mui/material';
import React from 'react'

const BasicInfo = ({image,handleImageUpload,form,handleChange}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-center mb-6">
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="h-28 w-28 rounded-full object-cover border-4 border-white shadow mb-3"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center mb-3 text-gray-500">
            No Image
          </div>
        )}
        <label className="block text-sm font-semibold mb-1 text-center">
          Upload Profile Picture
        </label>
        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-sm">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Age"
        name="age"
        value={form.age}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Gender"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        select
        fullWidth>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
    </div>
  );
}

export default BasicInfo
