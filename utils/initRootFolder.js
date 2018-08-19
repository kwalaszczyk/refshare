const initRootFolder = function(userId) {
  const newRef = new Refs({
    owner: userId,
    isFolder: true,
    parent: null,
    isRoot: true
  });
  console.log(`init root folder for user ${userId}`);
  newRef.save();
};

module.exports = initRootFolder;
