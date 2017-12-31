const OFFSET = 1; // px

function checkCollision(entity1, entity2) {
  if (entity1.getX() + OFFSET < entity2.getX() + entity2.getWidth() - OFFSET &&
      entity1.getX() + entity1.getWidth() - OFFSET > entity2.getX() + OFFSET &&
      entity1.getY() + OFFSET < entity2.getY() + entity2.getHeight() - OFFSET &&
      entity1.getHeight() + entity1.getY() - OFFSET > entity2.getY() + OFFSET) {
    return true;
  }
  return false;
}

export default {
  checkCollision
};
