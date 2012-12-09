<?php
/**
 * Helpers for theming, available for all themes in their template files and functions.php.
 * This file is included right before the themes own functions.php
 */
 

/**
 * Print debuginformation from the framework.
 */
function get_debug() {
  // Only if debug is wanted.
  $sk = CSkrutt::Instance();  
  if(empty($sk->config['debug'])) {
    return;
  }
  
  // Get the debug output
  $html = null;
  if(isset($sk->config['debug']['db-num-queries']) && $sk->config['debug']['db-num-queries'] && isset($sk->db)) {
    $flash = $sk->session->GetFlash('database_numQueries');
    $flash = $flash ? "$flash + " : null;
    $html .= "<p>Database made $flash" . $sk->db->GetNumQueries() . " queries.</p>";
  }    
  if(isset($sk->config['debug']['db-queries']) && $sk->config['debug']['db-queries'] && isset($sk->db)) {
    $flash = $sk->session->GetFlash('database_queries');
    $queries = $sk->db->GetQueries();
    if($flash) {
      $queries = array_merge($flash, $queries);
    }
    $html .= "<p>Database made the following queries.</p><pre>" . implode('<br/><br/>', $queries) . "</pre>";
  }    
  if(isset($sk->config['debug']['timer']) && $sk->config['debug']['timer']) {
    $html .= "<p>Page was loaded in " . round(microtime(true) - $sk->timer['first'], 5)*1000 . " msecs.</p>";
  }    
  if(isset($sk->config['debug']['skrutt']) && $sk->config['debug']['skrutt']) {
    $html .= "<hr><h3>Debuginformation</h3><p>The content of CSkrutt:</p><pre>" . htmlent(print_r($sk, true)) . "</pre>";
  }    
  if(isset($sk->config['debug']['session']) && $sk->config['debug']['session']) {
    $html .= "<hr><h3>SESSION</h3><p>The content of CSkrutt->session:</p><pre>" . htmlent(print_r($sk->session, true)) . "</pre>";
    $html .= "<p>The content of \$_SESSION:</p><pre>" . htmlent(print_r($_SESSION, true)) . "</pre>";
  }    
  return $html;
}


/**
 * Get messages stored in flash-session.
 */
function get_messages_from_session() {
  $messages = CSkrutt::Instance()->session->GetMessages();
  $html = null;
  if(!empty($messages)) {
    foreach($messages as $val) {
      $valid = array('info', 'notice', 'success', 'warning', 'error', 'alert');
      $class = (in_array($val['type'], $valid)) ? $val['type'] : 'info';
      $html .= "<div class='$class'>{$val['message']}</div>\n";
    }
  }
  return $html;
}


/**
 * Prepend the base_url.
 */
function base_url($url=null) {
  return CSkrutt::Instance()->request->base_url . trim($url, '/');
}


/**
 * Create a url to an internal resource.
 */
function create_url($url=null) {
  return CSkrutt::Instance()->request->CreateUrl($url);
}


/**
 * Prepend the theme_url, which is the url to the current theme directory.
 */
function theme_url($url) {
  $sk = CSkrutt::Instance();
  return "{$sk->request->base_url}themes/{$sk->config['theme']['name']}/{$url}";
}


/**
 * Return the current url.
 */
function current_url() {
  return CSkrutt::Instance()->request->current_url;
}


/**
 * Render all views.
 */
function render_views() {
  return CSkrutt::Instance()->views->Render();
}
