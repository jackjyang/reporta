import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.testng.Assert;

public class TemplateTest {	
	ChromeDriver driver;
	String url = "http://localhost:8080";
	int delay = 500;
	String expectedTitle = "Auto Test Template";
	String expectedContent = "";
	String copyName = "Copy of Auto Test Template";
	
	private void setup() {
		System.setProperty(
				"webdriver.chrome.driver",
				"C:\\Users\\Ryan\\Downloads\\Selenium\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.get(url);
		driver.manage().timeouts().implicitlyWait(100, TimeUnit.MILLISECONDS);
		WebElement templatesButton = driver.findElement(By.id("templates"));
		templatesButton.click();
	}
	
	private void goToNewTemplate() {
		WebElement templatesButton = driver.findElement(By.id("dashboard-new-template"));
		templatesButton.click();
	}
	
	private void deleteTemplates() throws InterruptedException {
		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		while (true) {
			List<WebElement> trs = table.findElements(By.className("accordion-toggle"));
			if (trs.isEmpty())
				break;

			WebElement tr = trs.get(0);
			tr.click();
			Thread.sleep(delay);

			WebElement deleteButton = table.findElements(By.tagName("button")).get(2);
			deleteButton.click();

			WebElement dialog = driver.findElement(By.className("modal-content"));
			WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
			WebElement deleteButton2 = modalFooter.findElements(By.className("btn")).get(1);
			deleteButton2.click();
			Thread.sleep(delay);
		}
	}
	
	private void createTemplate() {
		WebElement titleTextBox = driver.findElement(By.id("title"));
		titleTextBox.clear();
		titleTextBox.sendKeys(expectedTitle);
		
		WebElement groupChartButton = driver.findElement(By.cssSelector("a[title='Basic Analytic']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		WebElement chartButton = driver.findElement(By.cssSelector("a[title='Interrupt Analytic']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		List<WebElement> dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		WebElement dialog = dialogs.get(dialogs.size() - 1);
		WebElement chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("a");
		WebElement okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		WebElement ckEditor = driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']"));
		ckEditor.sendKeys(" and some text as well.");
		expectedContent = (String) driver.executeScript("return CKEDITOR.instances['templateEditor'].getData();");
		driver.findElement(By.cssSelector("button[ng-click='save()'")).click();
	}
	
	@Test
	public void testClickTemplatesTabTest() {
		setup();
		WebElement title = driver.findElement(By.tagName("h2"));
		Assert.assertEquals(title.getText(), "Templates");
		driver.quit();
	}
	
	@Test
	public void testClickNewTemplateButton() {
		setup();
		WebElement templatesButton = driver.findElement(By.id("dashboard-new-template"));
		templatesButton.click();
		Assert.assertEquals(driver.getCurrentUrl(), url + "/template_editor");
		driver.quit();
	}
	
	@Test
	public void testChangeTemplateTitle() {
		setup();
		goToNewTemplate();
		WebElement titleTextBox = driver.findElement(By.id("title"));
		titleTextBox.clear();
		titleTextBox.sendKeys(expectedTitle);
		Assert.assertEquals(titleTextBox.getText(), expectedTitle);
		driver.quit();
	}
	
	// Need switch to iframe because web driver can only focus on one thing at a time?
	// Super hacky but it always seems the iframe when you click the analytic group button
	// is always cke_76_frame so we check for this.
	@Test
	public void testBasicAnalyticCharts() throws InterruptedException {
		setup();
		goToNewTemplate();
		
		// Interrupt Analytic
		WebElement groupChartButton = driver.findElement(By.cssSelector("a[title='Basic Analytic']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		WebElement chartButton = driver.findElement(By.cssSelector("a[title='Interrupt Analytic']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		List<WebElement> dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		WebElement dialog = dialogs.get(dialogs.size() - 1);
		WebElement chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("a");
		WebElement okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		WebElement chart = driver.findElement(By.cssSelector("img[data-type='Interrupts']"));
		Assert.assertEquals("a", chart.getAttribute("data-name"));
		
		// Messaging Analytic
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Basic Analytic']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Messaging Analytic']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("b");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='messagingAnalytics']"));
		Assert.assertEquals("b", chart.getAttribute("data-name"));
		
		// Error Analytic
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Basic Analytic']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Error Analytic']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("c");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='errorAnalytics']"));
		Assert.assertEquals("c", chart.getAttribute("data-name"));
		
		// Error Analytic
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Basic Analytic']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Performance Analytic']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("d");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='performance']"));
		Assert.assertEquals("d", chart.getAttribute("data-name"));
		driver.quit();
	}
	
	@Test
	public void testAnomalyDetectionCharts() throws InterruptedException {
		setup();
		goToNewTemplate();
		
		// Density Map
		WebElement groupChartButton = driver.findElement(By.cssSelector("a[title='Anomaly Detection']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		WebElement chartButton = driver.findElement(By.cssSelector("a[title='Density Map']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		List<WebElement> dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		WebElement dialog = dialogs.get(dialogs.size() - 1);
		WebElement chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("a");
		WebElement okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		WebElement chart = driver.findElement(By.cssSelector("img[data-type='DensityMaps']"));
		Assert.assertEquals("a", chart.getAttribute("data-name"));
		
		// Messaging Analytic
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Anomaly Detection']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Markov Model']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("b");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='markovmodel']"));
		Assert.assertEquals("b", chart.getAttribute("data-name"));
		driver.quit();
	}
	
	@Test
	public void testInvariantMiningCharts() throws InterruptedException {
		setup();
		goToNewTemplate();
		
		// Co-occurrence
		WebElement groupChartButton = driver.findElement(By.cssSelector("a[title='Invariant Mining']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		WebElement chartButton = driver.findElement(By.cssSelector("a[title='Co-occurrence']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		List<WebElement> dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		WebElement dialog = dialogs.get(dialogs.size() - 1);
		WebElement chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("a");
		WebElement okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		WebElement chart = driver.findElement(By.cssSelector("img[data-type='CooccurInvar']"));
		Assert.assertEquals("a", chart.getAttribute("data-name"));
		
		// Followed By
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Invariant Mining']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Followed By']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("b");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='FollowCooccurInvar']"));
		Assert.assertEquals("b", chart.getAttribute("data-name"));
		
		// Preceded By
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Invariant Mining']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Preceded By']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("c");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='PrecedeCooccurInvar']"));
		Assert.assertEquals("c", chart.getAttribute("data-name"));
		
		// IFF Co-occurrence
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Invariant Mining']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='IFF Co-occurrence']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("d");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='IffCooccurInvar']"));
		Assert.assertEquals("d", chart.getAttribute("data-name"));
		
		// Single Period
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Invariant Mining']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Single Period']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("e");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='SinglePeriodInvar']"));
		Assert.assertEquals("e", chart.getAttribute("data-name"));
		
		// Dependencies
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Invariant Mining']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Dependencies']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("f");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='dependencies']"));
		Assert.assertEquals("f", chart.getAttribute("data-name"));
		driver.quit();
	}
	
	@Test
	public void testSingleTraceCharts() throws InterruptedException {
		setup();
		goToNewTemplate();
		
		// Buffer State
		WebElement groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		WebElement chartButton = driver.findElement(By.cssSelector("a[title='Buffer State']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		List<WebElement> dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		WebElement dialog = dialogs.get(dialogs.size() - 1);
		WebElement chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("a");
		WebElement okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		WebElement chart = driver.findElement(By.cssSelector("img[data-type='bufferState']"));
		Assert.assertEquals("a", chart.getAttribute("data-name"));
		
		// Arrival Curve
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Arrival Curve']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("b");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='ArrivalCurve']"));
		Assert.assertEquals("b", chart.getAttribute("data-name"));
		
		// ECDF
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='ECDF']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("c");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='ecdf']"));
		Assert.assertEquals("c", chart.getAttribute("data-name"));
		
		// Frequency Heatmap
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Frequency Heatmap']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("d");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='frequencyHeatmap']"));
		Assert.assertEquals("d", chart.getAttribute("data-name"));
		
		// Regularity Heatmap
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Regularity Heatmap']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("e");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='regularityHeatmap']"));
		Assert.assertEquals("e", chart.getAttribute("data-name"));
		
		// Event and Runtime Jitter
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Event and Runtime Jitter']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("f");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='EventRuntimeJitter']"));
		Assert.assertEquals("f", chart.getAttribute("data-name"));
		
		// Process State Analytics
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Process State Analytics']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("g");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='processStateAnalytics']"));
		Assert.assertEquals("g", chart.getAttribute("data-name"));
		
		// System Idle Time
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Single-Trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='System Idle Time']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("h");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='systemIdleTime']"));
		Assert.assertEquals("h", chart.getAttribute("data-name"));
		driver.quit();
	}
	
	@Test
	public void testMultiTraceCharts() throws InterruptedException {
		setup();
		goToNewTemplate();
		
		// Five Number Summary
		WebElement groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Multi-trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		WebElement chartButton = driver.findElement(By.cssSelector("a[title='Five-Number Summary']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		List<WebElement> dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		WebElement dialog = dialogs.get(dialogs.size() - 1);
		WebElement chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("a");
		WebElement okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		WebElement chart = driver.findElement(By.cssSelector("img[data-type='fiveNumberSummary']"));
		Assert.assertEquals("a", chart.getAttribute("data-name"));
		
		// Parallel Coordinates
		driver.switchTo().defaultContent();
		groupChartButton = driver.findElement(By.cssSelector("a[title='Custom Multi-trace Analytics']"));
		groupChartButton.click();
		driver.switchTo().frame("cke_76_frame");
		chartButton = driver.findElement(By.cssSelector("a[title='Parallel Coordinates']"));
		chartButton.click();
		driver.switchTo().defaultContent();
		dialogs = driver.findElements(By.cssSelector("table[class='cke_dialog_contents']"));
		dialog = dialogs.get(dialogs.size() - 1);
		chartNameBox = dialog.findElement(By.cssSelector("input[class='cke_dialog_ui_input_text']"));
		chartNameBox.sendKeys("b");
		okBox = dialog.findElement(By.cssSelector("a[title='OK']"));
		okBox.click();
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		chart = driver.findElement(By.cssSelector("img[data-type='parallelCoordinates']"));
		Assert.assertEquals("b", chart.getAttribute("data-name"));
		driver.quit();
	}
	
	@Test
	public void testSaveTemplate() throws InterruptedException {
		setup();
		deleteTemplates();
		goToNewTemplate();
		createTemplate();
		
		Thread.sleep(delay);
		WebElement table = driver.findElement(By.className("table"));
		String templateName = driver.findElement(By.cssSelector("td[class='ng-binding']")).getText();
		Assert.assertEquals(templateName, expectedTitle);
		WebElement tr = table.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(delay);

		WebElement editButton = table.findElements(By.tagName("button")).get(0);
		editButton.click();
		Thread.sleep(delay);
		Assert.assertEquals(
				driver.executeScript("return CKEDITOR.instances['templateEditor'].getData();"),
				expectedContent);
		Thread.sleep(delay);
		driver.findElement(By.xpath("//*[@id='viewContainer']/div/div[2]/button[2]")).click();
		deleteTemplates();
		driver.quit();
	}
	
	@Test
	public void testEditTemplate() throws InterruptedException {
		setup();
		deleteTemplates();
		goToNewTemplate();
		createTemplate();
		
		Thread.sleep(delay);
		WebElement table = driver.findElement(By.className("table"));
		String templateName = driver.findElement(By.cssSelector("td[class='ng-binding']")).getText();
		Assert.assertEquals(templateName, expectedTitle);
		WebElement tr = table.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(delay);
		WebElement editButton = table.findElements(By.tagName("button")).get(0);
		editButton.click();
		Thread.sleep(delay);		
		driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[title='Rich Text Editor, templateEditor']")));
		WebElement ckEditor = driver.findElement(By.cssSelector("body[contenteditable='true']"));
		ckEditor.clear();
		ckEditor.sendKeys("Edited text");
		driver.switchTo().defaultContent();
		Thread.sleep(delay);
		expectedContent = (String) driver.executeScript("return CKEDITOR.instances['templateEditor'].getData();");
		driver.findElement(By.cssSelector("button[ng-click='save()'")).click();
		
		table = driver.findElement(By.className("table"));
		templateName = driver.findElement(By.cssSelector("td[class='ng-binding']")).getText();
		Assert.assertEquals(templateName, expectedTitle);
		tr = table.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(delay);
		editButton = table.findElements(By.tagName("button")).get(0);
		editButton.click();
		Thread.sleep(delay);
		Assert.assertEquals(
				driver.executeScript("return CKEDITOR.instances['templateEditor'].getData();"),
				expectedContent);
		Thread.sleep(delay);
		driver.findElement(By.xpath("//*[@id='viewContainer']/div/div[2]/button[2]")).click();
		deleteTemplates();
		driver.quit();
	}
	
	@Test
	public void testTemplateClone() throws InterruptedException {
		setup();
		deleteTemplates();
		goToNewTemplate();
		createTemplate();
		
		Thread.sleep(delay);
		WebElement table = driver.findElement(By.className("table"));
		String templateName = driver.findElement(By.cssSelector("td[class='ng-binding']")).getText();
		Assert.assertEquals(templateName, expectedTitle);
		WebElement tr = table.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(delay);
		WebElement copyButton = table.findElements(By.tagName("button")).get(1);
		copyButton.click();
		WebElement name = driver.findElement(By.cssSelector("input[type='text']"));
		name.sendKeys(copyName);
		WebElement saveButton = driver.findElement(By.cssSelector("button[ng-click='clone()']"));
		saveButton.click();
		Thread.sleep(delay);
		table = driver.findElement(By.className("table"));
		List<WebElement> rows = table.findElements(By.cssSelector("tbody[ng-repeat='template in templates']"));
		Assert.assertEquals(2, rows.size());
		WebElement row1 = rows.get(0);
		row1.click();
		Thread.sleep(delay);
		WebElement editButton = row1.findElements(By.tagName("button")).get(0);
		editButton.click();
		String row1Content = (String) driver.executeScript("return CKEDITOR.instances['templateEditor'].getData();");
		driver.findElement(By.xpath("//*[@id='viewContainer']/div/div[2]/button[2]")).click();
		Thread.sleep(delay);
		table = driver.findElement(By.className("table"));
		rows = table.findElements(By.cssSelector("tbody[ng-repeat='template in templates']"));
		Assert.assertEquals(2, rows.size());
		WebElement row2 = rows.get(1);
		row2.click();
		Thread.sleep(delay);
		editButton = row2.findElements(By.tagName("button")).get(0);
		editButton.click();
		String row2Content = (String) driver.executeScript("return CKEDITOR.instances['templateEditor'].getData();");
		Thread.sleep(delay);
		driver.findElement(By.xpath("//*[@id='viewContainer']/div/div[2]/button[2]")).click();
		Assert.assertEquals(row1Content, row2Content);
		deleteTemplates();
		driver.quit();
	}

	@Test
	public void testDeleteTemplate() throws InterruptedException {
		setup();
		deleteTemplates();
		goToNewTemplate();
		createTemplate();
		deleteTemplates();
		WebElement table = driver.findElement(By.className("table"));
		List<WebElement> rows = table.findElements(By.cssSelector("tbody[ng-repeat='template in templates']"));
		Assert.assertEquals(rows.size(), 0);
		driver.quit();
	}
}