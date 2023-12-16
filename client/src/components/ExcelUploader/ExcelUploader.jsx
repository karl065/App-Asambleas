/* eslint-disable react/prop-types */
import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import * as XLSX from 'xlsx';

const ExcelUploader = ({onUpload}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1});

        // Llama a la función onUpload con los datos de Excel
        onUpload(jsonData);
      };

      reader.readAsArrayBuffer(file);
    },
    [onUpload]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-500 rounded p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Arrastra y suelta un archivo Excel o haz clic para seleccionar uno
      </p>
    </div>
  );
};

export default ExcelUploader;
