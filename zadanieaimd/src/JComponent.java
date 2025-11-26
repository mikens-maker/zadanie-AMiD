public class JComponent extends javax.swing.JFrame {
    public JComponent() {
        super("Rysowanie");

        // This now refers to the MyPanel class created above
        JPanel panel = new JPanel();

        add(panel);

        pack(); // Adjusts window size to fit the MyPanel preferred size
        setDefaultCloseOperation(javax.swing.JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }
}