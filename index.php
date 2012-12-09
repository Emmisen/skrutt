<?php
/**
 * All requests routed through here. This is an overview of what actaully happens during
 * a request.
 *
 * @package SkruttCore
 */

// ---------------------------------------------------------------------------------------
//
// PHASE: BOOTSTRAP
//
define('SKRUTT_INSTALL_PATH', dirname(__FILE__));
define('SKRUTT_SITE_PATH', SKRUTT_INSTALL_PATH . '/application');

require(SKRUTT_INSTALL_PATH.'/src/bootstrap.php');

$sk = CSkrutt::Instance();


// ---------------------------------------------------------------------------------------
//
// PHASE: FRONTCONTROLLER ROUTE
//
$sk->FrontControllerRoute();


// ---------------------------------------------------------------------------------------
//
// PHASE: THEME ENGINE RENDER
//
$sk->ThemeEngineRender();
