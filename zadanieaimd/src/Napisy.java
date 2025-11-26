import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.JLabel;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Napisy extends JFrame implements ActionListener {
    private JLabel outputLabel;
    private JTextField textField;

    public Napisy() {
        super("Okno 7: Napisy/Pole Tekstowe");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new FlowLayout());

        outputLabel = new JLabel("Wpisz coś i wciśnij ENTER:");
        textField = new JTextField(20);
        textField.addActionListener(this);

        add(outputLabel);
        add(textField);

        pack();
        setLocation(500, 400);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String text = textField.getText();
        outputLabel.setText("Wprowadzono: " + text);
    }
}