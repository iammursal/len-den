
const apiUrl = 'https://www.googleapis.com/drive/v3/files';

// Fetch spreadsheets
// axios.get(apiUrl, {
//     params: {
//         q: "mimeType='application/vnd.google-apps.spreadsheet'",
//         fields: 'files(id, name)',
//         access_token: accessToken,
//     },
// })
// .then((response) => {
//     const spreadsheets = response.data.files;
//     console.log('List of spreadsheets:', spreadsheets);
//     // Process the list of spreadsheets as needed
// })
// .catch((error) => {
//     console.error('Error fetching spreadsheets:', error);
// });

// fetch (without axios)

export const getAllSpreadSheets = async (accessToken: string): Promise<any> => {
    return await fetch(`${apiUrl}?q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id, name)&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            const spreadsheets = data.files;
            console.log('List of spreadsheets:', spreadsheets);
            // Process the list of spreadsheets as needed
            return spreadsheets
        })
        .catch(error => {
            console.error('Error fetching spreadsheets:', error);
            return error;
        });
}
