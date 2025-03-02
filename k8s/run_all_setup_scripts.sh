CURRENT_FOLDER=$(dirname "$(realpath "$0")")
for f in "$CURRENT_FOLDER"/setups/*.sh; do
  bash "$f" 
done