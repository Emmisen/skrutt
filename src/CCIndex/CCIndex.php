<?php
/**
 * Standard controller layout.
 * 
 * @package SkruttCore
 */
class CCIndex implements IController {

  /**
    * Implementing interface IController. All controllers must have an index action.
   */
  public function Index() {  
    global $sk;
    $sk->data['title'] = "The Index Controller";
    $sk->data['main'] = "<h1>The Index Controller</h1>";
  }

} 
