CREATE DATABASE  IF NOT EXISTS `placementwebapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `placementwebapp`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: placementwebapp
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Computer Science'),(2,'Mechanical'),(3,'E.X.T.C.'),(4,'Electrical'),(5,'I.T.'),(6,'All');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions_dataset`
--

DROP TABLE IF EXISTS `questions_dataset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions_dataset` (
  `question_id` int NOT NULL,
  `question_text` varchar(326) DEFAULT NULL,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `option4` varchar(255) DEFAULT NULL,
  `correct_option` varchar(255) NOT NULL,
  `question_difficulty` varchar(255) NOT NULL,
  `subject_id` int NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `questions_dataset_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions_dataset`
--

LOCK TABLES `questions_dataset` WRITE;
/*!40000 ALTER TABLE `questions_dataset` DISABLE KEYS */;
INSERT INTO `questions_dataset` VALUES (1,'What is a data structure?','A programming language','A collection of algorithms','A way to store and organize data','A type of computer hardware','c','Easy',1,'D.S.A'),(2,'What are the disadvantages of arrays?','Index value of an array can be negative','Elements are sequentially accessed','Data structure like queue or stack cannot be implemented','There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size','d','Easy',1,'D.S.A'),(3,'Which data structure is used for implementing recursion?','Stack','Queue','List','Array','a','Easy',1,'D.S.A'),(4,'The data structure required to check whether an expression contains a balanced parenthesis is?','Queue','Stack','Tree','Array','b','Easy',1,'D.S.A'),(5,'Which of the following is not the application of stack?','Data Transfer between two asynchronous process','Compiler Syntax Analyzer','Tracking of local variables at run time','A parentheses balancing program','a','Easy',1,'D.S.A'),(6,'Which data structure is needed to convert infix notation to postfix notation?','Tree','Branch','Stack','Queue','c','Easy',1,'D.S.A'),(7,'Which of the following statement(s) about stack data structure is/are NOT correct?','Top of the Stack always contain the new node','Stack is the FIFO data structure','Null link is present in the last node at the bottom of the stack','Linked List are used for implementing Stacks','b','Easy',1,'D.S.A'),(8,'Which data structure is based on the Last In First Out (LIFO) principle?','Tree','Linked List','Stack','Queue','c','Easy',1,'D.S.A'),(9,'What is a bit array?','Data structure that compactly stores bits','Data structure for representing arrays of records','Array in which elements are not present in continuous locations','An array in which most of the elements have the same value','a','Easy',1,'D.S.A'),(10,'Which of the following data structures can be used for parentheses matching?','n-ary tree','queue','priority queue','stack','d','Easy',1,'D.S.A'),(11,'What is the need for a circular queue?','easier computations','implement LIFO principle in queues','effective usage of memory','to delete elements based on priority','c','Easy',1,'D.S.A'),(12,'What is an AVL tree?','a tree which is unbalanced and is a height balanced tree','a tree which is balanced and is a height balanced tree','a tree with atmost 3 children','a tree with three children','b','Easy',1,'D.S.A'),(13,'Which is the most appropriate data structure for reversing a word?','stack','queue','graph','tree','a','Easy',1,'D.S.A'),(14,'In linked list each node contains a minimum of two fields. One field is data field to store the data second field is?','Pointer to character','Pointer to integer','Pointer to node','Node','c','Easy',1,'D.S.A'),(15,'Which of the following is false about a doubly linked list?','We can navigate in both the directions','It requires more space than a singly linked list','The insertion and deletion of a node take a bit longer','Implementing a doubly linked list is easier than singly linked list','d','Easy',1,'D.S.A'),(16,'What is the value of the postfix expression 6 3 2 4 + � *?','74','-18','22','40','b','Medium',1,'D.S.A'),(17,'What data structure would you mostly likely see in non recursive implementation of a recursive algorithm?','Stack','linked list','tree','queue','a','Medium',1,'D.S.A'),(18,'The data structure required for Breadth First Traversal on a graph is?','Array','Stack','Tree','Queue','d','Medium',1,'D.S.A'),(19,'The prefix form of A-B/ (C * D ^ E) is?','-A/B*C^DE','-A/BC*^DE','-ABCD*^DE','-/*^ACBDE','a','Medium',1,'D.S.A'),(20,'Which of the following tree data structures is not a balanced binary tree?','Splay tree','B-tree','AVL tree','Red-black tree','b','Medium',1,'D.S.A'),(21,'Which of the following is not the type of queue?','Priority queue','Circular queue','Single ended queue','Ordinary queue','c','Medium',1,'D.S.A'),(22,'Which of the following is the most widely used external memory data structure?','B-tree','Red-black tree','AVL tree','Both AVL tree and Red-black tree','a','Medium',1,'D.S.A'),(23,'Which of the following data structure can provide efficient searching of the elements?','binary search tree','unordered lists','2-3 tree','treap','c','Medium',1,'D.S.A'),(24,'The optimal data structure used to solve Tower of Hanoi is _________','Tree','Heap','Priority queue','Stack','d','Medium',1,'D.S.A'),(25,'What is the advantage of a hash table as a data structure?','easy to implement','faster access of data','exhibit good locality of reference','very efficient for less number of entries','b','Medium',1,'D.S.A'),(26,'What is a dequeue?','A queue implemented with both singly and doubly linked lists','A queue with insert/delete defined for front side of the queue','A queue with insert/delete defined for both front and rear ends of the queue','A queue implemented with a doubly linked list','c','Medium',1,'D.S.A'),(27,'What would be the asymptotic time complexity to add a node at the end of singly linked list, if the pointer is initially pointing to the head of the list?','O(1)','O(n)','?(n)','?(1)','c','Medium',1,'D.S.A'),(28,'What kind of linked list is best to answer questions like �What is the item at position n?�','Singly linked list','Doubly linked list','Circular linked list','Array implementation of linked list','d','Medium',1,'D.S.A'),(29,'Which of the following is false about a circular linked list?','Every node has a successor','Time complexity of inserting a new node at the head of the list is O(1)','Time complexity for deleting the last node is O(n)','We can traverse the whole circular linked list by starting from any point','b','Medium',1,'D.S.A'),(30,'Space complexity for an adjacency list of an undirected graph having large values of V (vertices) and E (edges) is ___________','O(E)','O(V*V)','O(E+V)','O(V)','c','Medium',1,'D.S.A'),(31,'Which of the following application makes use of a circular linked list?','Recursive function calls','Undo operation in a text editor','Implement Hash Tables','Allocating CPU to resources','d','Hard',1,'D.S.A'),(32,'Which type of data structure is a ternary heap?','Hash','Array','Priority Stack','Priority Queue','d','Hard',1,'D.S.A'),(33,'What is simple uniform hashing?','Every element has equal probability of hashing into any of the slots','A weighted probabilistic method is used to hash elements into the slots','Elements has Random probability of hashing into array slots','Elements are hashed based on priority','a','Hard',1,'D.S.A'),(34,'In simple uniform hashing, what is the search complexity?','O(n)','O(logn)','O(nlogn)','O(1)','d','Hard',1,'D.S.A'),(35,'What is the maximum number of possible non zero values in an adjacency matrix of a simple graph with n vertices?','(n*(n-1))/2','(n*(n+1))/2','n*(n-1)','n*(n+1)','c','Hard',1,'D.S.A'),(36,'Which of these adjacency matrices represents a simple graph?','[ [1, 0, 0], [0, 1, 0], [0, 1, 1] ]','[ [1, 1, 1], [1, 1, 1], [1, 1, 1] ]','[ [0, 0, 1], [0, 0, 0], [0, 0, 1] ]','[ [0, 0, 1], [1, 0, 1], [1, 0, 0] ]','d','Hard',1,'D.S.A'),(37,'What is the hash function used in Double Hashing?','(h1(k) � i*h2(k))mod m','h1(k) + h2(k)','(h1(k) + i*h2(k))mod m','(h1(k) + h2(k))mod m','c','Hard',1,'D.S.A'),(38,'What is the location of a parent node for any arbitary node i?','(i/2) position','(i+1)/ position','floor(i/2) position','ceil(i/2) position','c','Hard',1,'D.S.A'),(39,'What is the time complexity of balancing parentheses algorithm?','O (N)','O (N log N)','O (M log N)','O (N2)','a','Hard',1,'D.S.A'),(40,'How many passes does the balancing symbols algorithm makes through the input?','one','two','three','four','a','Hard',1,'D.S.A'),(41,'Which of the following statement is invalid with respect to balancing symbols?','[(A+B) + (C-D)]','[{A+B}-{C-[D+E]}]','((A+B) + (C+D)','�{(A+B) + [C+D]}','c','Hard',1,'D.S.A'),(42,'�Floyd Warshall Algorithm used to solve the shortest path problem has a time complexity of __________','O(V*V)','O(V*V*V)','�O(E*V)','O(E*E)','b','Hard',1,'D.S.A'),(43,'Assuming value of every weight to be greater than 10, in which of the following cases the shortest path of a directed weighted graph from 2 vertices u and v will never change?','add all values by 10','subtract 10 from all the values','multiply all values by 10','in both the cases of multiplying and adding by 10','c','Hard',1,'D.S.A'),(44,'What is the maximum possible number of edges in a directed graph with no self loops having 8 vertices?','28','64','256','56','d','Hard',1,'D.S.A'),(45,'In case of insertion into a linked queue, a node borrowed from the __________ list is inserted in the queue.','AVAIL','FRONT','REAR',NULL,'a','Hard',1,'D.S.A'),(46,'In linked list implementation of a queue, front and rear pointers are tracked. Which of these pointers will change during an insertion into a NONEMPTY queue?','Only front pointer','Only rear pointer','Both front and rear pointer','No pointer will be changed','b','Medium',1,'D.S.A'),(47,'In linked list implementation of a queue, front and rear pointers are tracked. Which of these pointers will change during an insertion into EMPTY queue?','Only front pointer','Only rear pointer','Both front and rear pointer','No pointer will be changed','c','Medium',1,'D.S.A'),(48,'In linked list implementation of a queue, from where is the item deleted?','At the head of link list','At the centre position in the link list','At the tail of the link list','Node before the tail','a','Easy',1,'D.S.A'),(49,'In linked list implementation of a queue, the important condition for a queue to be empty is?','FRONT is null','REAR is null','LINK is empty','FRONT==REAR-1','a','Easy',1,'D.S.A'),(50,'The essential condition which is checked before insertion in a linked queue is?','Underflow','Overflow','Front Value','Rear Value','b','Easy',1,'D.S.A'),(51,'What is the load factor for an open addressing technique?','1','0','0.5','5','c','Hard',1,'D.S.A'),(52,'Which one of the following data structures are preferred in database-system implementation?','AVL Tree','B-Tree','B+ Tree','Splay Tree','c','Hard',1,'D.S.A'),(53,'What maximum difference in heights between the leafs of a AVL tree is possible?','log(n) where n is the number of nodes','n where n is the number of nodes','0 or 1','Atmost 1','a','Hard',1,'D.S.A'),(54,'�How can you save memory when storing color information in Red-Black tree?','using least significant bit of one of the pointers in the node for color information','using another array with colors of each node','storing color information in the node structure','using negative and positive numbering','a','Hard',1,'D.S.A'),(55,'Which of the following is the efficient data structure for searching words in dictionaries?','BST','Linked List','Balanced BST','Trie','d','Hard',1,'D.S.A'),(56,'When we have red-black trees and AVL trees that can perform most of operations in logarithmic times, then what is the need for splay trees?','no there is no special usage','In real time it is estimated that 80% access is only to 20% data, hence most used ones must be easily available','redblack and AVL are not upto mark','they are just another type of self-balancing binary search trees','b','Hard',1,'D.S.A'),(57,'We are given a set of n distinct elements and an unlabelled binary tree with n nodes. In how many ways can we populate the tree with the given set so that it becomes a binary search tree?','0','1','n!','1/n+1','b','Hard',1,'D.S.A'),(58,'Which of the following is true?','larger the order of B-tree, less frequently the split occurs','larger the order of B-tree, more frequently the split occurs','smaller the order of B-tree, more frequently the split occurs','smaller the order of B-tree, less frequently the split occurs','a','Hard',1,'D.S.A'),(59,'Five node splitting operations occurred when an entry is inserted into a B-tree. Then how many nodes are written?','14','7','11','5','c','Hard',1,'D.S.A'),(60,'A dictionary has a set of ------- and each key has a single associated value.','Keys','Index','Both front and rear pointer','None of the above','a','Hard',1,'D.S.A'),(61,'Consider a hash table of size seven, with starting index zero, and a hash function (3x + 4)mod7. Assuming the hash table is initially empty, which of the following is the contents of the table when the sequence 1, 3, 8, 10 is inserted into the table using closed hashing? Note that \'_\' denotes an empty location in the table.','8 - - - - - 10','1 8 10 - - - 3','1 - - - - - 3','1 10 8 - - - 3','b','Hard',1,'D.S.A'),(62,'Which hashing technique is free from clustering?','Linear Probing','Double hashing','Quadratic hashing','Rehashing','b','Hard',1,'D.S.A'),(63,'We are given a set of n distinct elements and an unlabelled binary tree with n nodes. In how many ways can we populate the tree with the given set so that it becomes a binary search tree?','0','1','n!','(1/(n+1)).2nCn','b','Hard',1,'D.S.A'),(64,'�Which hash function is used in the division method?','h(k) = k/m','h(k) = k mod m','h(k) = m/k','h(k) = m mod k','b','Hard',1,'D.S.A'),(65,'When it would be optimal to prefer Red-black trees over AVL trees?','when there are more insertions or deletions','when more search is needed','when tree must be balanced','when log(nodes) time complexity is needed','a','Hard',1,'D.S.A'),(66,'What is the special property of red-black trees and what root should always be?','a color which is either red or black and root should always be black color only','height of the tree','a color which is either green or black','pointer to next node','a','Hard',1,'D.S.A'),(67,'Which if the following is/are the levels of�implementation of data structure','Abstract level','Application level','Implementation level','All of the above','d','Easy',1,'D.S.A'),(68,'A binary search tree whose left subtree and rightsubtree differ in hight by at most 1 unit is called','AVL tree','Red-black tree','B Tree','B + Tree','a','Easy',1,'D.S.A'),(69,'������.. level is where the model becomescompatible executable code','Abstract level','Application level','Implementation level','All of the above','c','Easy',1,'D.S.A'),(70,'Stack is also called as','Last in first out','First in last out','Last in last out','First in first out','a','Easy',1,'D.S.A'),(71,'In a circular queue the value of r will be ..','r=r+1','r=(r+1)% [QUEUE_SIZE � 1]','r=(r+1)% QUEUE_SIZE','r=(r-1)% QUEUE_SIZE','c','Medium',1,'D.S.A'),(72,'Suppose a binary search tree with 1000 distinct elements is also a complete binary tree. The tree is stored using the array representation of binary heap trees. Assuming that the array indices start with 0, the 3rd largest element of the tree is stored at index ___________.','529','509','499','519','b','Hard',1,'D.S.A'),(73,'The preorder traversal of a binary search tree is 15, 10, 12, 11, 20, 18, 16, 19. Which one of the following is the postorder traversal of the tree?','20,19,18,16,15,12,11,10','10,11,12,15,16,18,19,20','11,12,10,16,19,18,20,15','19,16,18,20,11,12,10,15','c','Hard',1,'D.S.A'),(74,'The postorder traversal of a binary tree is 8,9,6,7,4,5,2,3,1. The inorder traversal of the same tree is 8,6,9,4,7,2,5,1,3. The height of a tree is the length of the longest path from the root to any leaf. The height of the binary tree above is ______.','2','3','4','5','c','Medium',1,'D.S.A'),(75,'While inserting the elements 71,65,84,69,67,83 in an empty binary search tree in the sequence shown, the element in the lowest level is','65','67','69','83','b','Hard',1,'D.S.A'),(76,'Which one of the following is an application of Stack Data Structure?','Managing function calls','The stock span problem','Arithmetic expression evaluation','All of the above','d','Easy',1,'D.S.A'),(77,'Which one of the following is an application of Queue Data Structure?','When a resource is shared among multiple consumers','When data is transferred asynchronously (data not necessarily received at same rate as sent) between two processes','Load Balancing','All of the above','d','Easy',1,'D.S.A'),(78,'Which of the following sorting algorithms can be used to sort a random linked list with minimum time complexity?','Insertion Sort','Quick Sort','Heap Sort','Merge Sort','d','Medium',1,'D.S.A'),(79,'Which of the following is true about linked list implementation of stack?','When data is transferred asynchronously (data not necessarily received at same rate as sent) between two processes','In push operation, if new nodes are inserted at the beginning of linked list, then in pop operation, nodes must be removed from end.','Both of the above','None of the above','d','Medium',1,'D.S.A'),(80,'A program P reads in 500 integers in the range [0..100] representing the scores of 500 students. It then prints the frequency of each score above 50. What would be the best way for P to store the frequencies?','An array of 50 numbers','An array of 100 numbers','An array of 500 numbers','A dynamically allocated array of 550 numbers','a','Hard',1,'D.S.A'),(81,'Suppose the numbers 7, 5, 1, 8, 3, 6, 0, 9, 4, 2 are inserted in that order into an initially empty binary search tree. The binary search tree uses the usual ordering on natural numbers. What is the in-order traversal sequence of the resultant tree?','7 5 1 0 3 2 4 6 8 9','0 2 4 3 1 6 5 9 8 7','0 1 2 3 4 5 6 7 8 9','9 8 6 4 2 3 0 1 5 7','c','Hard',1,'D.S.A'),(82,'In the worst case, the number of comparisons needed to search a singly linked list of length n for a given element is','log(2*n)','n/2','log(2*n) -1','n','d','Medium',1,'D.S.A'),(83,'What is the worst case possible height of AVL tree?','2Logn Assume base of log is 2','1.44Logn Assume base of log is 2','Depends upon implementation','?(n)','b','Hard',1,'D.S.A'),(84,'Which of the following is FALSE about B/B+ tree','B/B+ trees grow upward while Binary Search Trees grow downward.','Time complexity of search operation in B/B+ tree is better than Red Black Trees in general.','Number of child pointers in a B/B+ tree node is always equals to number of keys in it plus one.','A B/B+ tree is defined by a term minimum degree. And minimum degree depends on hard disk block size, key and address sizes.','b','Easy',1,'D.S.A'),(85,'The order of an internal node in a B+ tree index is the maximum number of children it can have. Suppose that a child pointer takes 6 bytes, the search field value takes 14 bytes, and the block size is 512 bytes. What is the order of the internal node?','24','25','26','27','c','Easy',1,'D.S.A'),(86,'Consider a complete binary tree where the left and the right subtrees of the root are max-heaps. The lower bound for the number of operations to convert the tree to a heap is','?(logn)','?(n)','?(nlogn)','?(n2)','a','Easy',1,'D.S.A'),(87,'Given a hash table T with 25 slots that stores 2000 elements, the load factor ? for T is __________','80','0.0125','8000','1.25','a','Hard',1,'D.S.A'),(88,'Let P be a singly linked list. Let Q be the pointer to an intermediate node x in the list. What is the worst-case time complexity of the best known algorithm to delete the node Q from the list?','O(n)','O(log2 n)','O(logn)','O(1)','a','Easy',1,'D.S.A'),(89,'Let G be a weighted undirected graph and e be an edge with maximum weight in G. Suppose there is a minimum weight spanning tree in G containing the edge e. Which of the following statements is always TRUE? �','There exists a cutset in G having all edges of maximum weight','There exists a cycle in G having all edges of maximum weight','Edge e cannot be contained in a cycle.','All edges in G have the same weight','a','Easy',1,'D.S.A'),(90,'B+ Trees are considered BALANCED because','the lengths of the paths from the root to all leaf nodes differ from each other by at most 1.','the number of children of any two non-leaf sibling nodes differ by at most 1.','the number of records in any two leaf nodes differ by at most 1.','the lengths of the paths from the root to all leaf nodes are all equal.','d','Medium',1,'D.S.A'),(91,'When searching for the key value 60 in a binary search tree, nodes containing the key values 10, 20, 40, 50, 70 80, 90 are traversed, not necessarily in the order given. How many different orders are possible in which these key values can occur on the search path from the root to the node containing the value 60?','64','40','35','30','c','Medium',1,'D.S.A'),(92,'Which of the following is TRUE?','The cost of searching an AVL tree is ? (log n) but that of a binary search tree is O(n)','The cost of searching an AVL tree is ? (log n) but that of a complete binary tree is ? (n log n)','The cost of searching a binary search tree is O (log n ) but that of an AVL tree is ?(n)','The cost of searching an AVL tree is ? (n log n) but that of a binary search tree is O(n)','a','Medium',1,'D.S.A'),(93,'An advantage of chained hash table (external hashing) over the open addressing scheme is','Worst case complexity of search operations is less','Space used is less','Deletion is easier','None of the above','c','Easy',1,'D.S.A'),(94,'Which of the following option is not correct?','If the queue is implemented with a linked list, keeping track of a front pointer, Only rear pointer s will change during an insertion into an non-empty queue.','Queue data structure can be used to implement least recently used (LRU) page fault algorithm and Quick short algorithm.','Queue data structure can be used to implement Quick short algorithm but not least recently used (LRU) page fault algorithm.','Both (A) and (C)','c','Medium',1,'D.S.A'),(95,'The postorder traversal of a binary tree is 8, 9, 6, 7, 4, 5, 2, 3, 1. The inorder traversal of the same tree is 8, 6, 9, 4, 7, 2, 5, 1, 3. The height of a tree is the length of the longest path from the root to any leaf. The height of the binary tree above is ________ . Note -This was Numerical Type question.','2','3','4','5','c','Hard',1,'D.S.A'),(96,'The minimum number of stacks needed to implement a queue is','3','1','2','4','c','Easy',1,'D.S.A'),(97,'A B-Tree used as an index for a large database table has four levels including the root node. If a new key is inserted in this index, then the maximum number of nodes that could be newly created in the process are','5','4','1','2','a','Medium',1,'D.S.A'),(98,'A three dimensional array in �C++� is declared as int A[x][y][z]. Consider that array elements are stored in row major order and indexing begins from 0. Here, the address of an item at the location A[p][q][r] can be computed as follows (where w is the word length of an integer):','&A[0][0][0] + w(y * z * q + z * p + r)','&A[0][0][0] + w(y * z * p + z*q + r)','&A[0][0][0] + w(x * y * p + z * q+ r)','&A[0][0][0] + w(x * y * q + z * p + r)','b','Medium',1,'D.S.A'),(99,'The average depth of a binary search tree is:','O(1)','O(n)','O(n log n)','O(log n)','d','Medium',1,'D.S.A'),(100,'The following numbers are inserted into an empty binary search tree in the given order: 10, 1, 3, 5, 15, 12, 16. What is the height of the binary search tree (the height is the maximum distance of a leaf node from the root)?','2','3','5','6','b','Easy',1,'D.S.A'),(101,'A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?','3.6','7.2','8.4','10','b','Easy',40,'Aptitude'),(102,'An aeroplane covers a certain distance at a speed of 240 kmph in 5 hours. To cover the same distance in 1 and 2/3 hours, it must travel at a speed of:','300 kmph','300 kmph','600 kmph','720 kmph','d','Easy',40,'Aptitude'),(103,'If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:','50 km','56 km','70 km','80 km','a','Easy',40,'Aptitude'),(104,'A train can travel 50% faster than a car. Both start from point A at the same time and reach point B 75 kms away from A at the same time. On the way, however, the train lost about 12.5 minutes while stopping at the stations. The speed of the car is:','300 kmph','110 kmph','120 kmph','130 kmph','c','Easy',40,'Aptitude'),(105,'Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?','9','10','12','20','b','Easy',40,'Aptitude'),(106,'In a flight of 600 km, an aircraft was slowed down due to bad weather. Its average speed for the trip was reduced by 200 km/hr and the time of flight increased by 30 minutes. The duration of the flight is:','1 hour','2 hour','3 hours','4 hours','a','Medium',40,'Aptitude'),(107,'A man complete a journey in 10 hours. He travels first half of the journey at the rate of 21 km/hr and second half at the rate of 24 km/hr. Find the total journey in km.','220 km','224 km','230 km','234 km','b','Medium',40,'Aptitude'),(108,'The ratio between the speeds of two trains is 7 : 8. If the second train runs 400 km in 4 hours, then the speed of the first train is:','70 km/hr','75 km/hr','84 km/hr','87.5 km/hr','d','Medium',40,'Aptitude'),(109,'A man on tour travels first 160 km at 64 km/hr and the next 160 km at 80 km/hr. The average speed for the first 320 km of the tour is:','35.55 km/hr','36 km/hr','71.11 km/hr','71 km/hr','c','Medium',40,'Aptitude'),(110,'A car travelling with 5/7 of its actual speed covers 42 km in 1 hr 40 min 48 sec. Find the actual speed of the car.','17','25','30','35','d','Medium',40,'Aptitude'),(111,'In covering a distance of 30 km, Abhay takes 2 hours more than Sameer. If Abhay doubles his speed, then he would take 1 hour less than Sameer. Abhay\'s speed is:','5','6','6.25','7.5','a','Hard',40,'Aptitude'),(112,'Robert is travelling on his cycle and has calculated to reach point A at 2 P.M. if he travels at 10 kmph, he will reach there at 12 noon if he travels at 15 kmph. At what speed must he travel to reach A at 1 P.M.?','8','11','12','14','c','Hard',40,'Aptitude'),(113,'It takes eight hours for a 600 km journey, if 120 km is done by train and the rest by car. It takes 20 minutes more, if 200 km is done by train and the rest by car. The ratio of the speed of the train to that of the cars is:','02:03','03:02','03:04','04:03','c','Hard',40,'Aptitude'),(114,'A farmer travelled a distance of 61 km in 9 hours. He travelled partly on foot @ 4 km/hr and partly on bicycle @ 9 km/hr. The distance travelled on foot is:','14','15','16','17','c','Hard',40,'Aptitude'),(115,'A man covered a certain distance at some speed. Had he moved 3 kmph faster, he would have taken 40 minutes less. If he had moved 2 kmph slower, he would have taken 40 minutes more. The distance (in km) is:','35','36','37','40','d','Hard',40,'Aptitude'),(116,'A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:','Rs.650','Rs.651','Rs.698','Rs.700','c','Easy',40,'Aptitude'),(117,'Mr. Thomas invested an amount of Rs. 13,900 divided in two different schemes A and B at the simple interest rate of 14% p.a. and 11% p.a. respectively. If the total amount of simple interest earned in 2 years be Rs. 3508, what was the amount invested in Scheme B?','Rs.6400','Rs.6500','Rs.7200','Rs.7500','a','Medium',40,'Aptitude'),(118,'A sum fetched a total simple interest of Rs. 4016.25 at the rate of 9 p.c.p.a. in 5 years. What is the sum?','Rs. 4462.50','Rs. 8032.50','Rs. 8900','Rs. 8925','d','Medium',40,'Aptitude'),(119,'How much time will it take for an amount of Rs. 450 to yield Rs. 81 as interest at 4.5% per annum of simple interest?','3.5 years','4 years','4.5 years','5 years','b','Medium',40,'Aptitude'),(120,'Reena took a loan of Rs. 1200 with simple interest for as many years as the rate of interest. If she paid Rs. 432 as interest at the end of the loan period, what was the rate of interest?','3.6','6','18','cannot be determined','b','Medium',40,'Aptitude'),(121,'A sum of Rs. 12,500 amounts to Rs. 15,500 in 4 years at the rate of simple interest. What is the rate of interest?','3%','4%','5%','6%','d','Medium',40,'Aptitude'),(122,'An automobile financier claims to be lending money at simple interest, but he includes the interest every six months for calculating the principal. If he is charging an interest of 10%, the effective rate of interest becomes:','10%','10.25%','10.50%','None of the above','b','Medium',40,'Aptitude'),(123,'A lent Rs. 5000 to B for 2 years and Rs. 3000 to C for 4 years on simple interest at the same rate of interest and received Rs. 2200 in all from both of them as interest. The rate of interest per annum is:','5%','7%','7.13%','10%','d','Medium',40,'Aptitude'),(124,'A sum of Rs. 725 is lent in the beginning of a year at a certain rate of interest. After 8 months, a sum of Rs. 362.50 more is lent but at the rate twice the former. At the end of the year, Rs. 33.50 is earned as interest from both the loans. What was the original rate of interest?','3.60%','4.50%','5%','None of the above','d','Medium',40,'Aptitude'),(125,'A man took loan from a bank at the rate of 12% p.a. simple interest. After 3 years he had to pay Rs. 5400 interest only for the period. The principal amount borrowed by him was:','Rs.2000','Rs.10,000','Rs.15000','Rs.20000','c','Medium',40,'Aptitude'),(126,'A sum of money amounts to Rs. 9800 after 5 years and Rs. 12005 after 8 years at the same rate of simple interest. The rate of interest per annum is:','5%','8%','12%','15%','c','Medium',40,'Aptitude'),(127,'What will be the ratio of simple interest earned by certain amount at the same rate of interest for 6 years and that for 9 years?','01:03','01:04','02:03','02:04','c','Medium',40,'Aptitude'),(128,'A certain amount earns simple interest of Rs. 1750 after 7 years. Had the interest been 2% more, how much more interest would it have earned?','Rs. 35','Rs. 245','Rs. 350','Cannot be determined','d','Medium',40,'Aptitude'),(129,'A person borrows Rs. 5000 for 2 years at 4% p.a. simple interest. He immediately lends it to another person at 6 1/4% p.a for 2 years. Find his gain in the transaction per year.','Rs. 112.50','Rs. 125','Rs. 225','Rs. 167.50','a','Medium',40,'Aptitude'),(130,'An accurate clock shows 8 o\'clock in the morning. Through how may degrees will the hour hand rotate when the clock shows 2 o\'clock in the afternoon?','144�','150�','168�','180�','d','Medium',40,'Aptitude'),(131,'The reflex angle between the hands of a clock at 10.25 is:','180�','192�','195�','197 1/2�','d','Easy',40,'Aptitude'),(132,'A clock is started at noon. By 10 minutes past 5, the hour hand has turned through:','145�','150�','155�','160�','c','Easy',40,'Aptitude'),(133,'A watch which gains 5 seconds in 3 minutes was set right at 7 a.m. In the afternoon of the same day, when the watch indicated quarter past 4 o\'clock, the true time is:','2:00 PM','4:00 PM','3:00 PM','5:00 PM','b','Medium',40,'Aptitude'),(134,'How much does a watch lose per day, if its hands coincide every 64 minutes?','32 8/11 min.','90 min','36 8/11 min.','96 min.','a','Medium',40,'Aptitude'),(135,'At what time between 7 and 8 o\'clock will the hands of a clock be in the same straight line but, not together?','5 min. past 7','5 2/11 min.past 7','5 3/11 min. past 7','5 5/11 min.past 7','d','Medium',40,'Aptitude'),(136,'At what time between 5.30 and 6 will the hands of a clock be at right angles?','43 5/11 min. past 5','43 7/11 min. past 5','40 min.past 5','45 min.past 5','b','Medium',40,'Aptitude'),(137,'The angle between the minute hand and the hour hand of a clock when the time is 4.20, is:','0�','10�','5�','20�','b','Easy',40,'Aptitude'),(138,'At what angle the hands of a clock are inclined at 15 minutes past 5?','58 1/2�','64�','67 1/2�','72 1/2�','c','Medium',40,'Aptitude'),(139,'At 3:40, the hour hand and the minute hand of a clock form an angle of:','120�','125�','130�','135�','c','Easy',40,'Aptitude'),(140,'How many times are the hands of a clock at right angle in a day?','22','24','44','48','c','Medium',40,'Aptitude'),(141,'The angle between the minute hand and the hour hand of a clock when the time is 8.30, is:','80�','75�','60�','105�','b','Easy',40,'Aptitude'),(142,'How many times in a day, are the hands of a clock in straight line but opposite in direction?','20','22','24','48','b','Medium',40,'Aptitude'),(143,'At what time between 4 and 5 o\'clock will the hands of a watch point in opposite directions?','45 min. past 4','40 min. past 4','50 min. past 4','30 min. past 4','d','Hard',40,'Aptitude'),(144,'At what time between 9 and 10 o\'clock will the hands of a watch be together?','45 min. past 9','50 min. past 9','49 1/11 min.past9','48 2/11 min. past9','c','Hard',40,'Aptitude'),(145,'At what time, in minutes, between 3 o\'clock and 4 o\'clock, both the needles will coincide each other?','5 1/11 	\"','12 4/11 	\"','13 4/11 	\"','16 4/11 	\"','d','Medium',40,'Aptitude'),(146,'How many times do the hands of a clock coincide in a day?','20','21','22','24','c','Easy',40,'Aptitude'),(147,'A watch which gains uniformly is 2 minutes low at noon on Monday and is 4 min. 48 sec fast at 2 p.m. on the following Monday. When was it correct?','2 p.m. on Tuesday','2 p.m. on Wednesday','3 p.m. on Thursday','1 p.m. on Friday','b','Hard',40,'Aptitude'),(148,'From a group of 7 men and 6 women, five persons are to be selected to form a committee so that at least 3 men are there on the committee. In how many ways can it be done?','564','645','735','756','d','Hard',40,'Aptitude'),(149,'In how many different ways can the letters of the word \'LEADING\' be arranged in such a way that the vowels always come together?','360','480','720','5040','c','Hard',40,'Aptitude'),(150,'In how many different ways can the letters of the word \'CORPORATION\' be arranged so that the vowels always come together?','810','1440','2880','50400','d','Hard',40,'Aptitude'),(151,'Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?','210','1050','25200','21400','c','Hard',40,'Aptitude'),(152,'In how many ways can the letters of the word \'LEADER\' be arranged?','72','144','360','720','c','Hard',40,'Aptitude'),(153,'In a group of 6 boys and 4 girls, four children are to be selected. In how many different ways can they be selected such that at least one boy should be there?','159','194','205','209','d','Hard',40,'Aptitude'),(154,'How many 3-digit numbers can be formed from the digits 2, 3, 5, 6, 7 and 9, which are divisible by 5 and none of the digits is repeated?','5','10','15','20','d','Hard',40,'Aptitude'),(155,'In how many ways a committee, consisting of 5 men and 6 women can be formed from 8 men and 10 women?','266','5040','11760','86400','c','Medium',40,'Aptitude'),(156,'A box contains 2 white balls, 3 black balls and 4 red balls. In how many ways can 3 balls be drawn from the box, if at least one black ball is to be included in the draw?','32','48','64','96','c','Medium',40,'Aptitude'),(157,'In how many different ways can the letters of the word \'DETAIL\' be arranged in such a way that the vowels occupy only the odd positions?','32','48','36','60','c','Medium',40,'Aptitude'),(158,'In how many ways can a group of 5 men and 2 women be made out of a total of 7 men and 3 women?','63','90','126','45','a','Medium',40,'Aptitude'),(159,'How many 4-letter words with or without meaning, can be formed out of the letters of the word, \'LOGARITHMS\', if repetition of letters is not allowed?','40','400','5040','2520','c','Medium',40,'Aptitude'),(160,'In how many different ways can the letters of the word \'MATHEMATICS\' be arranged so that the vowels always come together?','10080','4989600','120960','None of these','c','Medium',40,'Aptitude'),(161,'In how many different ways can the letters of the word \'OPTICAL\' be arranged so that the vowels always come together?','120','720','4320','2160','b','Medium',40,'Aptitude'),(162,'A and B together have Rs. 1210. If 4/15 of A\'s amount is equal to 2/5 of B\'s amount, how much amount does B have?','Rs. 460','Rs. 484','Rs. 550','Rs. 664','b','Easy',40,'Aptitude'),(163,'Two numbers are respectively 20% and 50% more than a third number. The ratio of the two numbers is:','02:05','03:05','04:05','06:07','c','Easy',40,'Aptitude'),(164,'A sum of money is to be distributed among A, B, C, D in the proportion of 5 : 2 : 4 : 3. If C gets Rs. 1000 more than D, what is B\'s share?','Rs. 500','Rs. 1500','Rs. 2000','None of these','c','Easy',40,'Aptitude'),(165,'Seats for Mathematics, Physics and Biology in a school are in the ratio 5 : 7 : 8. There is a proposal to increase these seats by 40%, 50% and 75% respectively. What will be the ratio of increased seats?','02:03:04','06:07:08','06:08:09','None of these','a','Easy',40,'Aptitude'),(166,'In a mixture 60 litres, the ratio of milk and water 2 : 1. If this ratio is to be 1 : 2, then the quantity of water to be further added is:','20 litres','30 litres','40 litres','60 litres','d','Easy',40,'Aptitude'),(167,'The ratio of the number of boys and girls in a college is 7 : 8. If the percentage increase in the number of boys and girls be 20% and 10% respectively, what will be the new ratio?','08:09','17:18','21:22','20:19','c','Easy',40,'Aptitude'),(168,'Salaries of Ravi and Sumit are in the ratio 2 : 3. If the salary of each is increased by Rs. 4000, the new ratio becomes 40 : 57. What is Sumit\'s salary?','Rs. 17,000','Rs. 20,000','Rs. 25,500','Rs. 38,000','d','Easy',40,'Aptitude'),(169,'If 0.75 : x :: 5 : 8, then x is equal to:','1.12','1.2','1.25','1.3','b','Hard',40,'Aptitude'),(170,'The sum of three numbers is 98. If the ratio of the first to second is 2 :3 and that of the second to the third is 5 : 8, then the second number is:','20','30','48','58','b','Easy',40,'Aptitude'),(171,'If Rs. 782 be divided into three parts, proportional to 1/2 : 2/3 : 3/4 , then the first part is:','Rs. 182','Rs.190','Rs. 196','Rs. 204','d','Hard',40,'Aptitude'),(172,'The salaries A, B, C are in the ratio 2 : 3 : 5. If the increments of 15%, 10% and 20% are allowed respectively in their salaries, then what will be new ratio of their salaries?','03:03:10','10:11:20','23:33:60','20 : 60 : 63','c','Hard',40,'Aptitude'),(173,'If 40% of a number is equal to two-third of another number, what is the ratio of first number to the second number?','02:05','03:07','05:03','07:03','c','Hard',40,'Aptitude'),(174,'The fourth proportional to 5, 8, 15 is:','18','24','19','20','b','Hard',40,'Aptitude'),(175,'Two number are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:','27','33','49','55','b','Hard',40,'Aptitude'),(176,'In a bag, there are coins of 25 p, 10 p and 5 p in the ratio of 1 : 2 : 3. If there is Rs. 30 in all, how many 5 p coins are there?','50','100','150','200','c','Easy',40,'Aptitude'),(177,'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?','Sunday','Saturday','Friday','Wednesday','c','Easy',40,'Aptitude'),(178,'What was the day of the week on 28th May, 2006?','Thursday','Friday','Saturday','Sunday','d','Easy',40,'Aptitude'),(179,'What was the day of the week on 17th June, 1998?','Monday','Tuesday','Wednesday','Thursday','c','Medium',40,'Aptitude'),(180,'What will be the day of the week 15th August, 2010?','Sunday','Monday','Tuesday','Friday','a','Medium',40,'Aptitude'),(181,'Today is Monday. After 61 days, it will be:','Wednesday','Saturday','Tuesday','Thursday','b','Easy',40,'Aptitude'),(182,'If 6th March, 2005 is Monday, what was the day of the week on 6th March, 2004?','Sunday','Saturday','Tuesday','Wednesday','a','Easy',40,'Aptitude'),(183,'On what dates of April, 2001 did Wednesday fall?','1st, 8th, 15th, 22nd, 29th','2nd, 9th, 16th, 23rd, 30th','3rd, 10th, 17th, 24th','4th, 11th, 18th, 25th','d','Easy',40,'Aptitude'),(184,'How many days are there in x weeks x days?','7x2','8x','14x','7','b','Medium',40,'Aptitude'),(185,'The last day of a century cannot be','Monday','Wednesday','Tuesday','Friday','c','Medium',40,'Aptitude'),(186,'On 8th Feb, 2005 it was Tuesday. What was the day of the week on 8th Feb, 2004?','Tuesday','Monday','Sunday','Wednesday','c','Medium',40,'Aptitude'),(187,'The calendar for the year 2007 will be the same for the year:','2014','2016','2017','2018','c','Easy',40,'Aptitude'),(188,'Which of the following is not a leap year?','700','800','1200','2000','a','Easy',40,'Aptitude'),(189,'On 8th Dec, 2007 Saturday falls. What day of the week was it on 8th Dec, 2006?','Sunday','Thursday','Tuesday','Friday','d','Medium',40,'Aptitude'),(190,'January 1, 2008 is Tuesday. What day of the week lies on Jan 1, 2009?','Monday','Wednesday','Thursday','Sunday','c','Medium',40,'Aptitude'),(191,'January 1, 2007 was Monday. What day of the week lies on Jan. 1, 2008?','Monday','Tuesday','Wednesday','Sunday','b','Medium',40,'Aptitude'),(192,'The cube root of .000216 is:','0.6','0.06','77','87','b','Hard',40,'Aptitude'),(193,'What should come in place of both x in the equation x/(?128) = (?162)/x.','12','14','144','196','a','Hard',40,'Aptitude'),(194,'The least perfect square, which is divisible by each of 21, 36 and 66 is:','213444','214344','214434','231444','a','Hard',40,'Aptitude'),(195,'?(1.5625) = ?','1.05','1.25','1.45','1.55','b','Easy',40,'Aptitude'),(196,'If 3(?5) + ?(125) = 17.88, then what will be the value of (?80) + 6(?5) ?','13.41','20.46','21.66','22.35','d','Hard',40,'Aptitude'),(197,'If a = 0.1039, then the value of A group of students decided to collect as many paise from each member of group as is the number of members. If the total collection amounts to Rs. 59.29, the number of the member is the group is:','57','67','77','87','c','Hard',40,'Aptitude'),(198,'The square root of (7 + 3?5) (7 - 3?5) is:','?5','2','4','3?5','b','Easy',40,'Aptitude'),(199,'?(0.0169 x )? = 1.3','60','80','100','120','c','Hard',40,'Aptitude'),(200,'How many two-digit numbers satisfy this property.: The last digit (unit\'s digit) of the square of the two-digit number is 8 ?','1','2','3','None of these','d','Easy',40,'Aptitude'),(201,'What is 2+3?','5','7','8','9','a','Easy',40,'Aptitude');
/*!40000 ALTER TABLE `questions_dataset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `roll_no` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department_id` int NOT NULL,
  `semester` int NOT NULL,
  `sgpi` text,
  `cgpi` text,
  PRIMARY KEY (`roll_no`),
  UNIQUE KEY `email` (`email`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('5021145','5021145@it.fcrit.ac.in','5021145','Manas@123',5,5,'[\"9\",\"9\",\"9\",\"9\",\"9\",\"9\",\"9\",\"9\"]','[\"90\",\"90\",\"90\",\"90\",\"90\",\"90\",\"90\",\"90\"]'),('5021148','5021148@it.fcrit.ac.in','Shriraj','Shri@123',1,6,'[\"9\",\"9\",\"9\",\"9\",\"9\",\"9\",\"9\",\"9\"]','[\"90\",\"90\",\"90\",\"90\",\"90\",\"90\",\"90\",\"90\"]'),('5021153','5021153@it.fcrit.ac.in','Sahil','Sahil@123',5,5,'[\"9\",\"9\",\"9\",\"9\",\"9\",\"9\",\"9\",\"9\"]','[\"90\",\"90\",\"90\",\"90\",\"90\",\"90\",\"90\",\"90\"]');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_access`
--

DROP TABLE IF EXISTS `subject_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_access` (
  `access_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `subject_id` int DEFAULT NULL,
  PRIMARY KEY (`access_id`),
  UNIQUE KEY `access_id` (`access_id`),
  UNIQUE KEY `unique_access` (`user_id`,`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_access`
--

LOCK TABLES `subject_access` WRITE;
/*!40000 ALTER TABLE `subject_access` DISABLE KEYS */;
INSERT INTO `subject_access` VALUES (4,'5021145@it.fcrit.ac.in',40),(10,'5021148@it.fcrit.ac.in',40),(6,'5021151@it.fcrit.ac.in',40),(3,'5021152@it.fcrit.ac.in',40),(9,'5021153@it.fcrit.ac.in',40);
/*!40000 ALTER TABLE `subject_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subject_id` int NOT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'D.S.A',5),(2,'DBMS',5),(3,'OS',5),(4,'Java',5),(5,'Python',5),(6,'D.S.A',1),(7,'DBMS',1),(8,'OS',1),(9,'Java',1),(10,'Python',1),(40,'Aptitude',6);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `roll_no` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`roll_no`),
  UNIQUE KEY `email` (`email`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES ('5021151','5021151@it.fcrit.ac.in','Shreyas','Shreyas@123',5),('5021152','5021152@it.fcrit.ac.in','Azeem','Azeem@123',5),('5021153','5021153@it.fcrit.ac.in','Sahil','Sahil@123',5);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_responses`
--

DROP TABLE IF EXISTS `test_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_responses` (
  `id` varchar(255) NOT NULL,
  `data` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `marks_scored` decimal(10,0) DEFAULT NULL,
  `total_marks` int DEFAULT NULL,
  `percentage` varchar(255) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `teacher_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `test_responses_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`roll_no`),
  CONSTRAINT `test_responses_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_responses`
--

LOCK TABLES `test_responses` WRITE;
/*!40000 ALTER TABLE `test_responses` DISABLE KEYS */;
INSERT INTO `test_responses` VALUES ('hS','[]',0,100,'0 %','5021145','5021152@it.fcrit.ac.in');
/*!40000 ALTER TABLE `test_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tests` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `marks` int NOT NULL,
  `duration` int NOT NULL,
  `difficulty` varchar(255) NOT NULL,
  `subject_id` int NOT NULL,
  `teacher_email` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `teacher_email` (`teacher_email`),
  CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `tests_ibfk_2` FOREIGN KEY (`teacher_email`) REFERENCES `teachers` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-20 21:04:42
