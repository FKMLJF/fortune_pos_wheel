class CreateGames < ActiveRecord::Migration[7.2]
  def change
    create_table :games do |t|
      t.references :player, null: false, foreign_key: true
      t.string :result
      t.string :tx_hash

      t.timestamps
    end
  end
end
