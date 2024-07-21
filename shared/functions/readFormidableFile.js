import formidable from "formidable";

const readFile = (req) => {
  const form = formidable({
    allowEmptyFiles: false,
    encoding: 'utf-8',
    // Use it to control newFilename.
    filename: (name, ext, part, form) => {
      return part.originalFilename; // Will be joined with options.uploadDir.
    }
  })
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      resolve({ files, fields });
    });
  });
}


export default readFile