<?php
/**
 * Holding a instance of CLydia to enable use of $this in subclasses and provide some helpers.
 *
 * @package SkruttCore
 */
class CObject {

	/**
	 * Members
	 */
	public $config;
	public $request;
	public $data;
	public $db;
	public $views;
	public $session;


	/**
	 * Constructor
	 */
	protected function __construct() {
    $sk = CSkrutt::Instance();
    $this->config   = &$sk->config;
    $this->request  = &$sk->request;
    $this->data     = &$sk->data;
    $this->db       = &$sk->db;
    $this->views    = &$sk->views;
    $this->session  = &$sk->session;
  }


	/**
	 * Redirect to another url and store the session
	 */
	protected function RedirectTo($url) {
    $sk = CSkrutt::Instance();
    if(isset($sk->config['debug']['db-num-queries']) && $sk->config['debug']['db-num-queries'] && isset($sk->db)) {
      $this->session->SetFlash('database_numQueries', $this->db->GetNumQueries());
    }    
    if(isset($sk->config['debug']['db-queries']) && $sk->config['debug']['db-queries'] && isset($sk->db)) {
      $this->session->SetFlash('database_queries', $this->db->GetQueries());
    }    
    if(isset($sk->config['debug']['timer']) && $sk->config['debug']['timer']) {
	    $this->session->SetFlash('timer', $sk->timer);
    }    
    $this->session->StoreInSession();
    header('Location: ' . $this->request->CreateUrl($url));
  }


}
