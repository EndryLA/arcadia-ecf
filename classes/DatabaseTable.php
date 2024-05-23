<?php

class DatabaseTable{
    private $pdo;
    private $table;
    private $primaryKey;

    function __construct(PDO $pdo, string $table, string $primaryKey)
    {
        $this->pdo = $pdo;
        $this->table = $table;
        $this->primaryKey = $primaryKey;
    }


    public function getAll() {
        $sql = 'SELECT * FROM ' . $this->table;
        $result = $this->pdo->query($sql);
        return $result->fetchAll();
    } 

    public function insert(array $fields){
        $sql = 'INSERT INTO `' . $this->table . '` (';
        foreach($fields as $key => $value) {
            $sql .= '`' . $key . '`,';
        }
        $sql = rtrim($sql,',');
        
        $sql .= ') VALUES ' . '(' ;

        foreach($fields as $key => $value) {
            $sql .= ':' . $key . ', ';
        }
        $sql = rtrim($sql,', ');

        $sql .= ')';
        

        $query = $this->pdo->prepare($sql);
        $query->execute($fields);

    }

    public function delete($id) {
        $sql = 'DELETE FROM `' . $this->table . '` WHERE `' . $this->primaryKey. '` = :id' ;
        $query = $this->pdo->prepare($sql);
        $query->execute(['id' => $id]);
    }
    
    public function selectLine($id) {
        $sql = 'SELECT * FROM `' . $this->table . '` WHERE `' . $this->primaryKey . '` = :id';
        $query = $this->pdo->prepare($sql);
        $query->execute(['id' => $id]);
            return $query->fetch();
    }
    
    public function selectLine2($key,$id) {
        $sql = 'SELECT * FROM `' . $this->table . '` WHERE `' . $key . '` = :id';
        $query = $this->pdo->prepare($sql);
        
        $query->execute(['id' => $id]);
        return $query->fetchAll();
        
    }

    public function update($fields,$primaryKey) {
        
        $sql = 'UPDATE `' . $this->table . '` SET ';
        
        foreach($fields as $key => $value) {
            $sql .= '`' . $key . '` = :' . $key . ', ';
        }
    
        $sql = rtrim($sql,', ');
    
        $sql .= ' WHERE ' . $this->primaryKey . '= ' .'"'. $primaryKey . '"'; 
    
        $sql = rtrim($sql,',');



        $query = $this->pdo->prepare($sql);
        $query->execute($fields);   
    }

    

}


