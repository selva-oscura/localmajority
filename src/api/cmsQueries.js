const cmsPath = 'https://cmsdev.localmajority.net/api';

const cmsQueries = {
  getAll: field => `${cmsPath}/${field}`,
  getOneById: uid => `${cmsPath}/id/${uid}`,
  getOneByPath: urlPath => `${cmsPath}/${urlPath}`,
};

export default cmsQueries;
