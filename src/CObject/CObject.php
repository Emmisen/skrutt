<?php
/**
 * Holding a instance of CSkrutt to enable use of $this in subclasses and provide some helpers.
 *
 * @package SkruttCore
 */
class CObject {

	/**
	 * Members
	 */
	protected $sk;
	protected $config;
	protected $request;
	protected $data;
	protected $db;
	protected $views;
	protected $session;
	protected $user;


	/**
	 * Constructor, can be instantiated by sending in the $sk reference.
	 */
	protected function __construct($sk=null) {
	  if(!$sk) {
	    $sk = CSkrutt::Instance();
	  }
	  $this->ly       = &$sk;
    $this->config   = &$sk->config;
    $this->request  = &$sk->request;
    $this->data     = &$sk->data;
    $this->db       = &$sk->db;
    $this->views    = &$sk->views;
    $this->session  = &$sk->session;
    $this->user     = &$sk->user;
	}


	/**
	 * Wrapper for same method in CSkrutt. See there for documentation.
	 */
	protected function RedirectTo($urlOrController=null, $method=null, $arguments=null) {
    $this->ly->RedirectTo($urlOrController, $method, $arguments);
  }


	/**
	 * Wrapper for same method in CSkrutt. See there for documentation.
	 */
	protected function RedirectToController($method=null, $arguments=null) {
    $this->ly->RedirectToController($method, $arguments);
  }


	/**
	 * Wrapper for same method in CSkrutt. See there for documentation.
	 */
	protected function RedirectToControllerMethod($controller=null, $method=null, $arguments=null) {
    $this->ly->RedirectToControllerMethod($controller, $method, $arguments);
  }


	/**
	 * Wrapper for same method in CSkrutt. See there for documentation.
	 */
  protected function AddMessage($type, $message, $alternative=null) {
    return $this->ly->AddMessage($type, $message, $alternative);
  }


	/**
	 * Wrapper for same method in CSkrutt. See there for documentation.
	 */
	protected function CreateUrl($urlOrController=null, $method=null, $arguments=null) {
    return $this->ly->CreateUrl($urlOrController, $method, $arguments);
  }


}
